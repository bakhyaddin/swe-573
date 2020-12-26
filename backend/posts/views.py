from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from rest_framework.exceptions import ValidationError

class PostsAPIView(APIView):
    def post(self, request, *args, **kwargs):
        print(request.data)
        return Response(request.data.get("search"), HTTP_200_OK)