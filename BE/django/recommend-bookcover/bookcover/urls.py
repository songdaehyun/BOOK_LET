from django.urls import path
from . import views

urlpatterns = [
    # 사용자에 따라 추천 내용을 특화해야 하는 경우 "/image/<int:userid>." 로 변경해야 한다.
    path('image/', views.image_recommend),
    path('savedata/', views.data_refine_progress),
]
