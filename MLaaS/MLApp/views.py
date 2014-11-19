from django.shortcuts import render, render_to_response
from django.template import RequestContext

def index(request):
    return render_to_response('index.haml',
        context_instance=RequestContext(request))

def whiteboard(request):
    return render_to_response('whiteboard.haml',
        context_instance=RequestContext(request))

