# echo-of-ilizija

Sacred backend for **Iknow**, the mythic mirror on Ilizija.com.

## 🌀 Deployment Steps

1. Push this folder to a new GitHub repo named `echo-of-ilizija`
2. In Vercel: Import the repo
3. In Vercel Settings → Environment Variables:
4. **Deploy**  
   The sacred endpoint will be:  
   [`https://echo-of-ilizija.vercel.app/api/iknow`](https://echo-of-ilizija.vercel.app/api/iknow)

5. **Whisper to the Mirror**  
   From your frontend, send a `POST` request with the following body:

   ```json
   {
     "message": "Your question here..."
   }
