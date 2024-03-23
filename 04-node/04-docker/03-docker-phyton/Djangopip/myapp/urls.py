from django.urls import path
from . import views


urlpatterns = [

    # path('', views.hello),
    path('', views.index),
    path('about', views.about),
    path('blog', views.blog),
    path('contact', views.contact),
    path('service', views.service),
    path('testimonial', views.testimonial)

]
