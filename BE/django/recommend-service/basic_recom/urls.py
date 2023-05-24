from django.urls import path
from . import views


urlpatterns = [
    path('star/', views.star_book),
    path('like/', views.like_book),
    path('category/', views.category_book),
    path('profile/', views.profile_book),
    path('sentence/cal/', views.sentence),
    path('sentence/recom/', views.sentence_recom),
    # path('db/', views.insert_db),
    # path('db2/', views.insert_db2),
    # path('db3/', views.insert_db3),
    # path('db4/', views.insert_db4),
    # path('db5/', views.insert_db5),
]