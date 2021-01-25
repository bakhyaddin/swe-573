from django.conf.urls import url
from posts import views
from posts.fetch_twits_scheduler import fetch_twits


# from apscheduler.schedulers.background import BackgroundScheduler
# import time

# sched = BackgroundScheduler()
# sched.add_job(fetch_twits, 'interval', id='fetch_twits', seconds=3)
# sched.start()


urlpatterns = [
    url(r'^posts/', views.PostsAPIView.as_view(), name='posts')
]