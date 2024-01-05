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
@app.route('/api/cars', methods=['GET'])
def get_data():
    try:
        
        connection = mysql.connector.connect(**mysql_config)
        if connection.is_connected():
            print("Connected to MySQL database")
            cursor = connection.cursor()

            # Define your SQL query to retrieve data from a table
            query = "SELECT * FROM car"

            # Execute the SQL query
            cursor.execute(query)

            # Fetch all the rows
            rows = cursor.fetchall()

            # Convert data to a list of dictionaries
            data = []
            for row in rows:
                data.append({
                    'id': row[0],  # Replace column1_name with your column names
                    'model': row[1],  # Replace column2_name with your column names
                    'user_id': row[2],  # Replace column2_name with your column names
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
@app.route('/api/cars', methods=['POST'])
def add_data():
    try:
        if request.method == 'POST':
            # Get the data from the POST request
            data = request.get_json()
            connection = mysql.connector.connect(**mysql_config)

            if connection.is_connected():
                print("Connected to MySQL database")
                cursor = connection.cursor()

                # Insert data into the table (modify query and table name accordingly)
                query = "INSERT INTO car (id, model, user_id) VALUES (NULL, %s, %s)"
                values = (data.get('model'), data.get('user_id'))  # Replace column1, column2 with your column names

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
@app.route('/api/cars/<int:data_id>', methods=['PUT'])
def update_data(data_id):
    try:
        connection = mysql.connector.connect(**mysql_config)

        if connection.is_connected():
            print("Connected to MySQL database")
            cursor = connection.cursor()

            # Retrieve data from the request body (assuming JSON data is sent)
            data = request.json
            new_model = data.get('model')
            new_user_id = data.get('user_id')

            # Update the data based on the ID
            update_query = "UPDATE car SET model = %s, user_id = %s WHERE id = %s"
            cursor.execute(update_query, (new_model, new_user_id, data_id))

            # Commit the transaction
            connection.commit()

            cursor.close()
            connection.close()

            return jsonify({'message': f'Data with ID {data_id} updated successfully'})

    except mysql.connector.Error as error:
        print("Error while connecting to MySQL:", error)
        return jsonify({'error': 'Failed to update data'})

    
    # Endpoint to delete data from MySQL
@app.route('/api/cars/<int:data_id>', methods=['DELETE'])
def delete_data(data_id):
    try:
        connection = mysql.connector.connect(**mysql_config)

        if connection.is_connected():
            print("Connected to MySQL database")
            cursor = connection.cursor()

            # Delete data based on the data_id parameter
            delete_query = "DELETE FROM car WHERE id = %s"  # Assuming 'id' is the column for identifying records
            cursor.execute(delete_query, (data_id,))

            # Commit the transaction
            connection.commit()

            cursor.close()
            connection.close()

            return jsonify({'message': f'Data with ID {data_id} deleted successfully'})

    except mysql.connector.Error as error:
        print("Error while connecting to MySQL:", error)
        return jsonify({'error': 'Failed to delete data'})



if __name__ == '__main__':
    app.run(debug=True)  # Run the Flask app in debug mode