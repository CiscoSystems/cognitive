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

class Classifier:
    def __init__(self, input_data, classifier_type, train_data_percentage , input_features, target_feature):
        self.input_data = input_data
        self.train_data_percentage = train_data_percentage
        self.target_feature = target_feature
        self.input_features = input_features
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
        print "Input features ", list(self.input_features)
        print "Target feature ", self.target_feature
        features = self.input_data[self.input_features].values
        labels = self.input_data[self.target_feature].values
        test_data_percentage = 1 - self.train_data_percentage
        X_train, X_test, Y_train, Y_actual = cross_validation.train_test_split(features, labels, test_size=test_data_percentage, random_state=0) 
        self.clf.fit(X_train, Y_train)
        Y_pred = self.clf.predict(X_test) 
        accuracy = accuracy_score(Y_actual, Y_pred)
        recall = recall_score(Y_actual, Y_pred)
        precision =precision_score(Y_actual, Y_pred)
        f1 = f1_score(Y_actual, Y_pred)
        mat =confusion_matrix(Y_actual, Y_pred)
        true_positives = mat[1][1]
        false_positives = mat[0][1]
        true_negatives = mat[0][0]
        false_negatives = mat[1][0]
        result = {'accuracy_score': accuracy, 'recall_score':recall, 'precision_score':precision, 'f1_score':f1, 'true_positives':true_positives, 'false_positives':false_positives, 'true_negatives':true_negatives, 'false_negatives':false_negatives}
        print result
        return result

