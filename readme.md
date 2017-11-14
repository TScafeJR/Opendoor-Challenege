It took me about an hour and a half to create these api endpoints and this brief project a response to OpenDoor’s take home.

I used PostgresQL to serve as my database. I created a table called ‘Challenges’ with the following parameters:
    id Integer,
    street VarChar,
    status VarChar,
    price Integer,
    bedrooms Integer,
    bathroom Integer,
    sq_ft Integer,
    lat Float,
    lng Float

AFter creating that table I imported the data by running the following SQL Query:
    `COPY persons(first_name,last_name,dob,email) 
    FROM 'C:\file_location\listing-details.csv' DELIMITER ',' CSV HEADER;`

This query populated my challenge table with the requested date. 

Once I had the data in the table, I just wrote the enpoints to query out of the proper database and table.

If I could work on this for a little longer, I would add a front end to make the queries quicker to write, but also to display the information in a more accessible format. Next, I would also write this using a simple csv import because it took me a while to figure out how to import the required data into my SQL database. However, the first thing that came to mind was a SQL sort so I went with that.

How to run yourself:
1. Once you open the folder, navigate to the correct directory and run ‘npm I’
2. Create an env.sh file and fill the DATABASE_URL enviornmental variable with the correct url
3. Run `source env.sh` in your terminal
4. Run the script `npm start` in your terminal
5. Open a program such as postman in order to view the get routes and their responsive JSON responses
    *note: 
            min_price uses the string minprice in the query
            max_price uses the string maxprice in the query
            min_bedrooms uses the string minbed in the query
            max_bedrooms uses the string maxbed in the query
            min_bathrooms uses the string minbath in the query
            max_bathrooms uses the string maxbath in the query

    *example route: http://localhost:3000/listings/?minprice=200000&minbed=2&maxbed=5&minbath=2





