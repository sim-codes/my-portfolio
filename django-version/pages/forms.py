from django import forms

class ContactForm(forms.Form):
   full_name = forms.CharField(max_length = 150, 
                              widget= forms.TextInput(attrs={'class':'form-control', 'placeholder':'Enter name'}))
   phone_number = forms.CharField(max_length = 13,
                                  widget= forms.TextInput(attrs={'class':'form-control', 'placeholder':'Enter phone number'}))
   email = forms.EmailField(widget=forms.EmailInput(attrs={'class':'form-control', 'placeholder':'Enter email'}))
   message = forms.CharField(max_length=250, widget=forms.Textarea(attrs={'class':'form-control', 'placeholder':'Enter message'}))