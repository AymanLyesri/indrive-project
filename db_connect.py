from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)

CORS(app)  # Apply CORS to your Flask app

mysql_config = {
    'host':'localhost',
    'user':'root',
    'password':'',
    'database':'indrive'
}


# Endpoint to retrieve data from MySQL
@app.route('/api/<string:table>', methods=['GET'])
def get_data(table):
    try:
        
        connection = mysql.connector.connect(**mysql_config)
        if connection.is_connected():
            print("Connected to MySQL database")
            cursor = connection.cursor()

            # Define your SQL query to retrieve data from a table
            query = "SELECT * FROM " + table

            # Execute the SQL query
            cursor.execute(query)

            # Fetch all the rows
            rows = cursor.fetchall()

            # Convert data to a list of dictionaries
            if table == 'cars':
                data = []
                for row in rows:
                    data.append({
                        'id': row[0],  # Replace column1_name with your column names
                        'model': row[1],  # Replace column2_name with your column names
                        'user_id': row[2],  # Replace column2_name with your column names
                    })
            elif table == 'users':
                data = []
                for row in rows:
                    data.append({
                        'id': row[0],  # Replace column1_name with your column names
                        'login': row[1],  # Replace column2_name with your column names
                        'password': row[2],  # Replace column2_name with your column names
                        'admin': row[3],  # Replace column2_name with your column names
                    })
                    
            elif table == 'trajectories':
                data = []
                for row in rows:
                    data.append({
                        'id': row[0],  # Replace column1_name with your column names
                        'from_place': row[1],  # Replace column2_name with your column names
                        'to_place': row[2],  # Replace column2_name with your column names
                        'car_id': row[3],  # Replace column2_name with your column names
                    })

            # Close cursor and connection
            cursor.close()
            connection.close()

            # Return the retrieved data as JSON response
            return jsonify(data)

    except mysql.connector.Error as error:
        print("Error while connecting to MySQL:", error)
        return jsonify({'error': 'Failed to retrieve data'})
    

# Endpoint to insert new data into MySQL
@app.route('/api/<string:table>', methods=['POST'])
def add_data(table):
    try:
        if request.method == 'POST':
            # Get the data from the POST request
            data = request.get_json()
            connection = mysql.connector.connect(**mysql_config)

            if connection.is_connected():
                print("Connected to MySQL database")
                cursor = connection.cursor()

                if table == 'cars':
                    query = "INSERT INTO cars (id, model, user_id) VALUES (NULL, %s, %s)"
                    values = (data.get('model'), data.get('user_id'))  # Replace column1, column2 with your column names
                elif table == 'users':
                    query = "INSERT INTO users (id, login, password, admin) VALUES (NULL, %s, %s, %s)"
                    values = (data.get('login'), data.get('password'), data.get('admin'))
                elif table == 'trajectories':
                    query = "INSERT INTO trajectories (id, from_place, to_place, car_id) VALUES (NULL, %s, %s, %s)"
                    values = (data.get('from_place'), data.get('to_place'), data.get('car_id'))

                # Execute the SQL query
                cursor.execute(query, values)

                # Commit changes to the database
                connection.commit()

                # Close cursor and connection
                cursor.close()
                connection.close()

                return jsonify({'message': 'Data inserted successfully'})

    except mysql.connector.Error as error:
        print("Error while connecting to MySQL:", error)
        return jsonify({'error': 'Failed to insert data'})
    
# Update route to modify data in MySQL
@app.route('/api/<string:table>/<int:data_id>', methods=['PUT'])
def update_data(table,data_id):
    try:
        connection = mysql.connector.connect(**mysql_config)

        if connection.is_connected():
            print("Connected to MySQL database")
            cursor = connection.cursor()

            # Retrieve data from the request body (assuming JSON data is sent)
            data = request.json

            # Update the data based on the ID
            if table == 'cars':
                update_query = "UPDATE cars SET model = %s, user_id = %s WHERE id = %s"
                cursor.execute(update_query, ( data.get('model'), data.get('user_id'), data_id))
            elif table == 'users':
                update_query = "UPDATE user SET login = %s, password = %s, admin = %s WHERE id = %s"
                cursor.execute(update_query, ( data.get('login'), data.get('password'), data.get('admin'), data_id))
            elif table == 'trajectories':
                update_query = "UPDATE trajectories SET from_place = %s, to_place = %s, car_id = %s WHERE id = %s"
                cursor.execute(update_query, ( data.get('from_place'), data.get('to_place'), data.get('car_id'), data_id))


            # Commit the transaction
            connection.commit()

            cursor.close()
            connection.close()

            return jsonify({'message': f'Data with ID {data_id} updated successfully'})

    except mysql.connector.Error as error:
        print("Error while connecting to MySQL:", error)
        return jsonify({'error': 'Failed to update data'})

    
    # Endpoint to delete data from MySQL
@app.route('/api/<string:table>/<int:data_id>', methods=['DELETE'])
def delete_data(table,data_id):
    try:
        connection = mysql.connector.connect(**mysql_config)

        if connection.is_connected():
            print("Connected to MySQL database")
            cursor = connection.cursor()

            # Delete data based on the data_id parameter
            delete_query = f"DELETE FROM {table} WHERE id = %s"  # Assuming 'id' is the column for identifying records
            cursor.execute(delete_query, (data_id,))

            # Commit the transaction
            connection.commit()

            cursor.close()
            connection.close()

            return jsonify({'message': f'Data with ID {data_id} deleted successfully'})

    except mysql.connector.Error as error:
        print("Error while connecting to MySQL:", error)
        return jsonify({'error': 'Failed to delete data'})


# Endpoint to insert new data into MySQL
@app.route('/api/authentication', methods=['POST'])
def authentication():
    try:
        if request.method == 'POST':
            # Get the data from the POST request
            data = request.get_json()
            connection = mysql.connector.connect(**mysql_config)

            if connection.is_connected():
                print("Connected to MySQL database")
                cursor = connection.cursor()
                
                login = data.get('login')
                password = data.get('password')

                # Insert data into the table (modify query and table name accordingly)
                query = "SELECT * FROM users"
                
                # Execute the SQL query
                cursor.execute(query)
                
                # Fetch all the rows
                rows = cursor.fetchall()
                
                # Close cursor and connection
                cursor.close()
                connection.close()

                # Convert data to a list of dictionaries
                data = []
                for row in rows:
                    data.append({
                        'id': row[0],  # Replace column1_name with your column names
                        'login': row[1],  # Replace column2_name with your column names
                        'password': row[2],  # Replace column2_name with your column names
                        'admin': row[3],  # Replace column2_name with your column names
                    })
                    
               # Check if the login and password exist in the 'data' list
                user_found = False
                is_admin = False
                for user in data:
                    print(login,password)
                    if user['login'] == login and user['password'] == password:
                        user_found = True
                        is_admin = bool(user['admin'])
                        break

                if user_found:
                    if is_admin:
                        print("User is an admin.")
                    else:
                        print("User is not an admin.")
                else:
                    print("Login or password incorrect.")


                return jsonify([user_found, is_admin])

    except mysql.connector.Error as error:
        print("Error while connecting to MySQL:", error)
        return jsonify({'error': 'Failed to insert data'})
    


if __name__ == '__main__':
    app.run(debug=True)  # Run the Flask app in debug mode