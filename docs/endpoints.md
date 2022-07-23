# Endpoints
### POST /api/profiles/register
- REQUEST
```javascript
    {
        "nickname":,
        "email":,
        "password":,
        "cpassword":
    }
``` 
- RESPONSE
```javascript
    {
        "nickname":,
        "email":,
        "password_salt,":,
        "password_hash",
        "created_at":
    }
``` 

### POST /api/profiles/login
- REQUEST
```javascript
    {
        "email":,
        "password":,
    }
``` 
- RESPONSE
```javascript
    {
        "email":,
        "password":,
    }
``` 

### GET /api/profiles/:slug
- REQUEST
```javascript
    {
    }
``` 
- RESPONSE
```javascript
    {
        "nickname":,
        "email":,
        "password_salt,":,
        "password_hash",
        "created_at":
    }
``` 

### GET /api/profiles/:slug/notes
- REQUEST
```javascript
    {
    }
``` 
- RESPONSE
```javascript
    {
        {
            "title":,
            "notetext":,
            "likecount",
            "dislikecount",
            "is_anonymus"
        },
        {
            "title":,
            "notetext":,
            "likecount",
            "dislikecount",
            "is_anonymus"
        }
        .
        .
        .
    }
``` 
### GET /api/notes/:slug
- REQUEST
```javascript
    {
    }
``` 
- RESPONSE
```javascript
    {
        "id":,
        "userid":,
        "title":,
        "notetext":,
        "likecount",
        "dislikecount",
        "is_anonymus":,
        "created_at":,
        "updated_at":,
        "deleted_at":
    }
```
### POST /api/notes/:slug
- REQUEST
```javascript
    {
        "notetext":,
         "isanonymus":
    }
``` 
- RESPONSE
```javascript
    {
        "id":,
        "userid":,
        "title":,
        "notetext":,
        "likecount",
        "dislikecount",
        "is_anonymus":,
        "created_at":,
        "updated_at":,
        "deleted_at":
    }
```

### DELETE /api/notes/:slug
- REQUEST
```javascript
    {
    }
``` 
- RESPONSE
```javascript
    {
        "id":,
        "userid":,
        "title":,
        "notetext":,
        "likecount",
        "dislikecount",
        "is_anonymus":,
        "created_at":,
        "updated_at":,
        "deleted_at":
    }
```
### PUT /api/notes/:slug
- REQUEST
```javascript
    {
        "notetext":,
        "isanonymus":
    }
``` 
- RESPONSE
```javascript
    {
        "id":,
        "userid":,
        "title":,
        "notetext":,
        "likecount",
        "dislikecount",
        "is_anonymus":,
        "created_at":,
        "updated_at":,
        "deleted_at":
    }
```
### GET /api/notes/:slug
- REQUEST
```javascript
    {
        "to":
    }
``` 
- RESPONSE
```javascript
    {
        {
            "id":,
            "fromuser":,
            "touser":,
            "messages":,
            "created_at",
            "updated_at",
            "deleted_at":
        },
        {
            "id":,
            "fromuser":,
            "touser":,
            "messages":,
            "created_at",
            "updated_at",
            "deleted_at":
        }
        .
        .
        .
    }
```

### POST /api/notes/:slug
- REQUEST
```javascript
    {
        "to":,
        "message":,
    }
``` 
- RESPONSE
```javascript
    {
        {
            "id":,
            "fromuser":,
            "touser":,
            "messages":,
            "created_at",
            "updated_at",
            "deleted_at":
        }
    }
```

### DELETE /api/notes/:slug
- REQUEST
```javascript
    {
        "id":,
    }
``` 
- RESPONSE
```javascript
    {
        {
            "id":,
            "fromuser":,
            "touser":,
            "messages":,
            "created_at",
            "updated_at",
            "deleted_at":
        }
    }
```
### DELETE /api/notes/:slug
- REQUEST
```javascript
    {
        "id":,
        "message":,
    }
``` 
- RESPONSE
```javascript
    {
        {
            "id":,
            "fromuser":,
            "touser":,
            "messages":,
            "created_at",
            "updated_at",
            "deleted_at":
        }
    }
```