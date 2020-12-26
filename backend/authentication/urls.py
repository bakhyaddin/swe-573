from django.conf.urls import url

from authentication import views

urlpatterns = [
    url(r'^create-user/', views.UserCreateAPIView.as_view(), name="create-user"),
    url(r'^list-users/', views.UserListAPIView.as_view(), name="list-users"),
    url(r'^get-user/(?P<pk>[0-9]+)/', views.UserRetrieveAPIView.as_view(), name="get-user"),
    url(r'^delete-user/(?P<pk>[0-9]+)/', views.UserDeleteAPIView.as_view(), name="delete-user"),
    url(r'^login/', views.UserLoginAPIView.as_view(), name="login"),
]