from rest_framework import permissions
import jwt

class IsOwnerPermission(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """

    def has_permission(self, request, view):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method == 'get' or request.method == 'GET':
            return True
        else:
            if request.user.is_anonymous:
                return False
            else:
                if int(request.parser_context['kwargs'].get('pk')) is request.user.id:
                    return True
        return False


# def is_token_valid(token):
#     try:
#         jwt.decode(token, "secret")
#         return True
#     except jwt.ExpiredSignatureError:
#         return False