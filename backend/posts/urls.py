from django.conf import settings
from django.conf.urls.static import static
from posts import views
from django.urls import path
from posts.fetch_twits_scheduler import fetch_twits


# from apscheduler.schedulers.background import BackgroundScheduler
# import time

# sched = BackgroundScheduler()
# sched.add_job(fetch_twits, 'interval', id='fetch_twits', seconds=3)
# sched.start()


urlpatterns = [
    path('posts/', views.PostsAPIView.as_view(), name='posts'),
    path('get-results/', views.GetResultsAPI.as_view(), name='get-results'),
    path('delete-results/<int:pk>', views.DeleteResultsAPI.as_view(), name='delete-results')
]

# urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)