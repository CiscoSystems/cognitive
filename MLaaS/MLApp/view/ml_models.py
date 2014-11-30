from sklearn import cross_validation
from sklearn import datasets
from sklearn.metrics import *
from sklearn.svm import SVC
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.naive_bayes import GaussianNB
import numpy as np
import pandas as pd

class ML_model:
    def __init__(self, input_data, classifier_type, train_data_percentage , target_column):
        self.input_data = input_data
        self.train_data_percentage = train_data_percentage
        self.target_column = target_column
        if classifier_type == 'Linear_SVM':
            self.clf = SVC(kernel='linear', C=0.025)
        elif classifier_type == 'Nearest_Neighbours':
            self.clf = KNeighborsClassifier(3)
        elif classifier_type == 'Decision_Tree':
            self.clf = DecisionTreeClassifier(max_depth=5)
        elif classifier_type == 'Random_Forest':
            self.clf = RandomForestClassifier(max_depth=5, n_estimators=10, max_features=1)
        elif classifier_type == 'Naive_Bayes':
            self.clf = GaussianNB()
        
    
    def learn(self):
        input_features = range(len(self.input_data.columns))
        input_features.remove(self.target_column)
        input_features = [2 ,9]
        print input_features
        features = self.input_data[self.input_data.columns[input_features]].values
        labels = self.input_data[self.input_data.columns[self.target_column]].values
        test_data_percentage = 1 - self.train_data_percentage
        X_train, X_test, Y_train, Y_actual = cross_validation.train_test_split(features, labels, test_size=test_data_percentage, random_state=0) 
        print X_train.shape, Y_train.shape
        print X_test.shape, Y_actual.shape
        self.clf.fit(X_train, Y_train)
        print self.clf.score(X_test, Y_actual)
        Y_pred = self.clf.predict(X_test) 
        print "Accuracy_score ", accuracy_score(Y_actual, Y_pred)
        print "Recall_score ", recall_score(Y_actual, Y_pred)
        print "Precision_score ", precision_score(Y_actual, Y_pred)
        print "F1_score ", f1_score(Y_actual, Y_pred)
        mat =confusion_matrix(Y_actual, Y_pred)
        print "True Positives ", mat[1][1]
        print "False Positives", mat[0][1]
        print "True Negatives", mat[0][0]
        print "False Negatives", mat[1][0]

