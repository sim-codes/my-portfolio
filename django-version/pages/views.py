from django.views.generic import TemplateView
from django.shortcuts import render, redirect
# from django.contrib import messages

from .forms import ContactForm



class HomePageView(TemplateView):
    template_name = 'pages/home.html'

class AboutPageView(TemplateView):
    template_name = 'pages/about.html'


class WorkPageView(TemplateView):
    template_name = 'pages/work.html'


class ContactPageView(TemplateView):
    template_name = 'pages/contact.html'


def contact_page(request):
    if request.method == 'POST':
        form = ContactForm(data=request.POST)
        if form.is_valid():
            cd = form.cleaned_data
            # messages.success(request, 'Image added successfully')
            return redirect('contact-done')
            print(cd)
    else:
        form = ContactForm()
    return render(request, 'pages/contact.html', {'form': form})

def contact_form_done(request):
    return render(request, 'pages/contact-done.html')