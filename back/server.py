import flask

import pickle


app = flask.Flask(__name__)

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")

@app.route('/add', methods=['POST'])
def add():
    app.logger.info('add', flask.request)
    
    data = flask.request.get_json()
    
    tmp = []
    tmp.append(data)
    
    try:
        with open('datas', 'rb') as f:
            print("load")
            tmp = pickle.load(f)
            
            data["id"] = len(tmp)
            
            tmp.append(data)
            print(tmp)
            
        with open('datas', 'wb') as f:
            pickle.dump(tmp, f)
            
    except:
        with open('datas', 'wb') as f:
            pickle.dump(tmp, f)
        
    return flask.jsonify(data)

@app.route('/get', methods=['GET'])
def get():
    app.logger.info('get', flask.request)
    
    try:
        with open('datas', 'rb') as f:
            tmp = pickle.load(f)
            print(tmp)
            return flask.jsonify(tmp)
    except:
        return flask.jsonify([])
    
@app.route('/delete', methods=['POST'])
def delete():
    print(flask.request.get_data())
    app.logger.info('delete', flask.request)
    
    data = flask.request.get_json()
    print(data)
    
    try:
        with open('datas', 'rb') as f:
            tmp = pickle.load(f)
            print(tmp)
            
        with open('datas', 'wb') as f:
            tmp.remove(data)
            pickle.dump(tmp, f)
            
    except:
        pass
    
    return flask.jsonify(data)