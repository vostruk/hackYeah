#!flask/bin/python
import os
from flask import Flask
from flask import request
import pandas as pd
from sklearn import linear_model
import pickle
from pymongo import MongoClient

#connect to MongoDB
client = MongoClient(
    os.environ['DB_PORT_27017_TCP_ADDR'],
    27017)
db = client.traindb


app = Flask(__name__)

@app.route('/isAlive')
def index():
    return "true"

@app.route('/prediction/api/v1.0/some_prediction', methods=['GET'])
def get_prediction():
    feature1 = float(request.args.get('f1'))
    feature2 = float(request.args.get('f2'))
    feature3 = float(request.args.get('f3'))
    loaded_model = pickle.load(open('trained_model.pkl', 'rb'))
    prediction = loaded_model.predict([[feature1, feature2, feature3]])
    return str(prediction)

@app.route('/train_model')
def train_model():
    train_items = db.traindb.find()
    items = [item.features for item in train_items]
    trained_labels = [item.values for item in train_items]
    # creating and saving a model (train from mongoDB)
    reg_model = linear_model.LinearRegression()
    reg_model.fit(items, trained_labels) #items - [[1.,1.,5.], [2.,2.,5.], [3.,3.,1.]] trained_labels [0.,0.,1.]
    pickle.dump(reg_model, open('trained_model.pkl', 'wb'))


@app.route('/ok')
def ok():
    return "ok"

@app.route('/new_train_item', methods=['POST'])
def new_train_item():
    item_doc = {
        'name': request.form['name'],
        'description': request.form['description']
    }
    db.tododb.insert_one(item_doc)

    return redirect(url_for('ok'))



if __name__ == '__main__':
    if os.environ['ENVIRONMENT'] == 'production':
        app.run(port=5000,host='0.0.0.0')
    if os.environ['ENVIRONMENT'] == 'local':
        app.run(port=5000,host='0.0.0.0')
