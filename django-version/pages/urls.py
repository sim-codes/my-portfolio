from django.urls import path

from .views import HomePageView, AboutPageView, WorkPageView, ContactPageView, contact_page, contact_form_done


urlpatterns = [
    path('', HomePageView.as_view(), name='home'),
    path('about/', AboutPageView.as_view(), name='about'),
    path('works/', WorkPageView.as_view(), name='works'),
    path('contact/', contact_page, name='contact'),
    path('contact-done', contact_form_done, name='contact-done' )
]
