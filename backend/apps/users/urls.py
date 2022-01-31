from django.urls import path   
from . import views

urlpatterns = [
    path('signin/', views.UserSignIn.as_view(), name='user_signin'),
    path('signup/', views.UserSignUp.as_view(), name='user_signup'),
    path('profile/', views.UserProfile.as_view(), name='user_profile'),
    path('update/<int:id>/', views.UpdateProfile.as_view(), name='user_update_profile'),
    path('update/<int:id>/budget/', views.UpdateBudget.as_view(), name='user_update_budget'),
]