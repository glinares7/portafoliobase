from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse


# def hello(request):
#     return HttpResponse("Hello, World si  ")


def index(request):
    return render(request, 'index.html')
    # titulo = 'lo que se extrae del backend '
    # return render(request, 'index.html', {
    #     "tituloValor": titulo
    # })


def about(request):
    return render(request, "about.html")


def blog(request):
    return render(request, "blog.html")


def contact(request):
    return render(request, "contact.html")


def service(request):
    return render(request, "service.html")


def testimonial(request):
    return render(request, "testimonial.html")
