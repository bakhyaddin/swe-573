from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveAPIView, DestroyAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework.exceptions import ValidationError
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_200_OK

from authentication.models import UserTemplate
from authentication.serializers import UserCreateSerializer, \
    UserListSerializer, UserDataSerializer, UserDeleteSerializer, UserLoginSerializer

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


class IsAdminPermission(permissions.BasePermission):
    """Custom permission to only allow owners of an object to edit it."""

    def has_permission(self, request, view, obj):
        if request.method == permissions.SAFE_METHODS:
            return True
        return obj.id == request.user.id
        return False
