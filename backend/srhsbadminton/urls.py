"""srhsbadminton URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import include, path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt import views as jwt_views

from auth.views import LogoutView
from matches.views import (
    GameViewSet,
    MatchViewSet,
    PlayerViewSet,
    SchoolViewSet,
)
from posts.views import ImageViewSet, PostViewSet

router = DefaultRouter()
router.register(r"players", PlayerViewSet, basename="player")
router.register(r"schools", SchoolViewSet, basename="school")
router.register(r"matches", MatchViewSet, basename="match")
router.register(r"games", GameViewSet, basename="game")
router.register(r"posts", PostViewSet, basename="post")
router.register(r"images", ImageViewSet, basename="image")

urlpatterns = [
    path("admin/", admin.site.urls),
    path("token/", jwt_views.TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", jwt_views.TokenRefreshView.as_view(), name="token_refresh"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("", include(router.urls)),
]
