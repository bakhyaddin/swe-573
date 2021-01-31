from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveAPIView, DestroyAPIView, GenericAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from rest_framework_jwt.settings import api_settings
from rest_framework import permissions
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_200_OK, HTTP_401_UNAUTHORIZED
from django.http import HttpResponseRedirect
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from django.conf import settings
from django.core.mail import EmailMessage

import jwt
from decouple import config


from authentication.models import UserTemplate
from authentication.serializers import UserCreateSerializer, \
    UserListSerializer, UserDataSerializer, UserDeleteSerializer, UserLoginSerializer


jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

# from authentication.permissions import is_token_valid

class UserCreateAPIView(CreateAPIView):
    serializer_class = UserCreateSerializer
    queryset = UserTemplate.objects.all()

    def post(self, request, *args, **kwargs):
        set = request.data.get('email')
        sor = UserTemplate.objects.filter(email=set)
        if sor.count():
            raise ValidationError({"email": ["A user with that email already exists."]})
        else:
            return_data = (self.create(request, *args, **kwargs)).data
            user = UserTemplate.objects.get(email=return_data["email"])
            payload = jwt_payload_handler(user)
            token = jwt_encode_handler(payload)
            user_email = return_data["email"]

            current_site = get_current_site(request).domain
            relative_link = reverse("verify-email")
            abs_url = "http://"+current_site + relative_link + "?token=" + str(token)

            email_body = "Hi " + user_email + ". \n Please click the link to register. \n" + abs_url
            subject = "Verify your email"

            send_email(email_body, subject, user_email)
            return Response(return_data, status=200)


class UserListAPIView(ListAPIView):
    serializer_class = UserListSerializer
    queryset = UserTemplate.objects.all()


class UserRetrieveAPIView(RetrieveAPIView):
    serializer_class = UserDataSerializer
    queryset = UserTemplate.objects.all()


class UserDeleteAPIView(DestroyAPIView):
    serializer_class = UserDeleteSerializer
    queryset = UserTemplate.objects.all()


    def delete(self, request, *args, **kwargs):
        user = UserTemplate.objects.filter(id=kwargs.get("pk")).first()
        return_data = self.serializer_class(user).data
        self.destroy(self, request, *args, **kwargs).data
        return Response(return_data, status=200)


class UserLoginAPIView(APIView):
     def post(self, request, *args, **kwargs):
        data = request.data
        serializer = UserLoginSerializer(data=data)
        email = data.get('email', None)
        if email is None:
            raise ValidationError({"detail": ["You must give an email"]})
        if serializer.is_valid(raise_exception=True):
            new_data = serializer.data
            return Response(new_data, status=HTTP_200_OK)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


class VerifyEmail(GenericAPIView):
    def get(self, request, *args, **kwargs):
        token = request.GET.get("token")

        if settings.IS_LOCAL:
            redirect_to = "http://127.0.0.1:3000/login"
        else:
            redirect_to = "http://3.249.247.122/login"
        
        try:
            payload = jwt.decode(token, config('DJANGO_SECRET_KEY'))
            user = UserTemplate.objects.get(id = payload["user_id"])
            if not user.is_verified:
                user.is_verified = True
                user.save()
            return HttpResponseRedirect(redirect_to=redirect_to)
        except jwt.ExpiredSignatureError as identifier:
            return Response({"message": "Activation expired"}, HTTP_400_BAD_REQUEST)
        except jwt.exceptions.DecodeError as identifier:
            return Response({"message": "Invalid token"}, HTTP_400_BAD_REQUEST)
            

class CheckToken(APIView):
    serializer_class = UserListSerializer
    queryset = UserTemplate.objects.all()
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    def get(self, request, *args, **kwargs):
        return Response(status=HTTP_200_OK)


def send_email(body, subject, user_email):
    email = EmailMessage(subject=subject, body=body, to=[user_email])
    email.send()