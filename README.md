# Our Imaginary Sales Department (ISD) would like to manage potential Leads and their respective
Interests.

## A lead is defined as any potential customer. An interest is defined as what exactly the potential
customer is interested in (the content of their message).
Here’s what ISD requires:

1. They would like to view the list of all leads in the database. The newest leads should come
first.

2. The lead can submit a request form via the Imaginary Website (IW), which contains:
◦ email
◦ phone
◦ first name
◦ last name
◦ message

3. The lead can also call the ISD directly, in which case ISD would like the ability to create the
lead and their interest manually.

4. Every lead should be uniquely identified as a combination of their phone and their email.
There should not be any duplicates stored in the database.

5. Interests do not have to be unique.


## To run in dev
```
npm run dev
```

## Endpoint

To create a lead

`http://localhost:3000/user` 

Method: POST

Sample Body:
```
{
    "email": "johndoe+2@mail.com",
    "phone": "+923152433292",
    "first_name": "John1",
    "last_name": "Doe",
    "message": "message"
}
```

To list down all the leads

`http://localhost:3000/user` 

Method: GET


Note: Install run-rs globally with npm's -g flag.

```
npm install run-rs -g
```

then run

```
run-rs -v 4.0.0 --shell
```
