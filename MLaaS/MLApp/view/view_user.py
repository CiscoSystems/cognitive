from ..models import User
from ..serializers import UserSerializer
from ..views import send_response
from rest_framework import viewsets


class UserViewSet(viewsets.ViewSet):
    """
    A simple ViewSet that for listing or retrieving users.

    user_list = UserViewSet.as_view({
        'get': 'list',
        'post': 'create'
    })

    user_detail = UserViewSet.as_view({
        'get': 'retrieve',
        'put': 'update',
        'patch': 'partial_update',
        'delete': 'destroy'
    })
    """
    def list(self, request):
        user = User.objects.all()
        serializer = UserSerializer(user, many=True)
        return send_response(request.method, serializer)

    def retrieve(self, request, pk=None):
        user = User.objects.get(pk=pk)
        serializer = UserSerializer(user)
        return send_response(request.method, serializer)

    def create(self, request):
        serializer = UserSerializer(data=request.DATA)
        if serializer.is_valid():
            serializer.save()
        return send_response(request.method, serializer)

    def update(self, request, pk=None):
        user = User.objects.get(pk=pk)
        serializer = UserSerializer(user, data=request.DATA)
        if serializer.is_valid():
            serializer.save()
        return send_response(request.method, serializer)

    def destroy(self, request, pk=None):
        user = User.objects.get(pk=pk)
        serializer = None
        user.delete()
        return send_response(request.method, serializer)
