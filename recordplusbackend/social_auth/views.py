from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from .serializers import FacebookSocialAuthSerializer, GoogleSocialAuthSerializer, TwitterAuthSerializer

# Create your views here.
class GoogleSocialAuthView(GenericAPIView):
  serializer_class = GoogleSocialAuthSerializer
  
  def post(self, request):
    """Sent a google auth_token received from FE to get user information"""
    serializer = self.serializer_class(data=request.data)
    serializer.is_valid(raise_exception=True)
    data = (serializer.validated_data)['auth_token']
    return Response(data, status=status.HTTP_200_OK)


class FacebookSocialAuthView(GenericAPIView):
  serializer_class = FacebookSocialAuthSerializer

  def post(self, request):
    """
    Send a facebook access token received froôFE to get user information
    """
    serializer = self.serializer_class(data=request.data)
    serializer.is_valid(raise_exception=True)
    data = (serializer.validated_data)['auth_token']
    return Response(data, status=status.HTTP_200_OK)


class TwitterSocialAuthView(GenericAPIView):
    serializer_class = TwitterAuthSerializer

    def post(self, request):
      serializer = self.serializer_class(data=request.data)
      serializer.is_valid(raise_exception=True)
      return Response(serializer.validated_data, status=status.HTTP_200_OK)
