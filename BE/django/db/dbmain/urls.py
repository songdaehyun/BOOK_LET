from django.urls import path
from . import views

urlpatterns = [
    path('insertdb', views.insert_db),
    path('insertnew', views.insert_new),
    path('test', views.test),
    path('savefile', views.save_isbn),
    # path('score/paragraph', views.paragraph_score),
    # path('score/book', views.book_isbn_score),
]
