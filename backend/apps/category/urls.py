from django.urls import path   
from . import views

urlpatterns = [
    path('add/', views.CategoryAdd.as_view(), name='add-category'),
    path('update/<int:id>/', views.CategoryUpdate.as_view(), name='update-category'),
    path('delete/<int:id>/', views.CategoryDelete.as_view(), name='delete-category'),
    path('', views.CategoryList.as_view(), name='list-category'),
]