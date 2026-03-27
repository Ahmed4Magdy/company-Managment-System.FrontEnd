import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {  //req is  http request  

  const token = localStorage.getItem('token'); // will return saved token from browser storage 

  if (token) { // if true
    req = req.clone({  //HTTP requests are immutable (cannot be changed directly)
      setHeaders: {
        Authorization: `Bearer ${token.trim()}`   //will use berarer => This is the standard format for sending tokens to backend,trim for prevent any extra space 
      }
    }); //Now req becomes the modified request with token
  }

  return next(req); //Pass the request to the next step:If modified → sends with token


};





