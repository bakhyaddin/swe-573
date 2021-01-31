from rest_framework.serializers import ModelSerializer
from rest_framework.exceptions import ValidationError
from rest_framework_jwt.settings import api_settings

from rest_framework.fields import CharField

from django.contrib.auth.models import User
from authentication.models import UserTemplate

jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER


class UserCreateSerializer(ModelSerializer):
    class Meta:
        model = UserTemplate
        fields = ('id', 'email', 'name', 'surname', 'password')
        extra_kwargs = {
            'password': {
                'write_only': True
            }
        }

    def create(self, validated_data):
        user = UserTemplate.objects.create_user(
            email=validated_data.get('email'),
            name=validated_data.get('name'),
            surname=validated_data.get('surname'),
            password=validated_data.get('password'),
        )
        
        return user

class UserListSerializer(ModelSerializer):
    class Meta:
        model = UserTemplate
        fields = ('id', 'email', 'name', 'surname')

class UserDataSerializer(ModelSerializer):
    class Meta:
        model = UserTemplate
        fields = ('id', 'email', 'name', 'surname')

class UserDeleteSerializer(ModelSerializer):
    class Meta:
        model = UserTemplate
        fields = ('id', 'email', 'name', 'surname')


class UserLoginSerializer(ModelSerializer):
    token = CharField(allow_blank=True, read_only=True)
    email = CharField(write_only=True, required=True)
    user = UserListSerializer(read_only=True)
    
    class Meta:
        model = UserTemplate
        fields = ('email', 'password', 'token', 'user', 'is_verified')
        extra_kwargs = {
            "password":{
                "write_only": True, "required": False
            }
        }

    def validate(self, data):
        password = data.get("password")
        email = data.get("email")
        user = UserTemplate.objects.filter(email=email).distinct()
        if user.exists() and user.count() == 1:
            user_obj = user.first()
        else:
            raise ValidationError({"detail": "Incorrect email address"})
        if user_obj:
            if not user_obj.is_verified:
                raise ValidationError({"detail": "Please verify your email"})
            if not user_obj.check_password(password):
                raise ValidationError({"detail": "Incorrect password"})
        payload = jwt_payload_handler(user_obj)
        token = jwt_encode_handler(payload)
        data["token"] = token
        data["user"] = user_obj
        return data