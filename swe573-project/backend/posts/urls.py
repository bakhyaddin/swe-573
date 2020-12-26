from django.conf.urls import url
from posts import views

urlpatterns = [
    url(r'^posts/', views.PostsAPIView.as_view(), name='posts')
]