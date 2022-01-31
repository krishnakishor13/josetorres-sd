from django.urls import path   
from . import views

urlpatterns = [
    path('add/', views.TransactionAdd.as_view(), name='add-transactions'),
    path('update/<int:id>/', views.TransactionUpdate.as_view(), name='update-transactions'),
    path('delete/<int:id>/', views.TransactionDelete.as_view(), name='delete-transactions'),
    path('', views.TransactionList.as_view(), name='list-transactions'),
    path('reports/', views.TransactionReport.as_view(), name='list-report-transactions'),
    path('expense-reports/', views.ExpenseReport.as_view(), name='expense-report-transactions'),
]