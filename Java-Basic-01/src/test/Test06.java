package test;

import test.testing.Testing01;

import java.util.ArrayList;

public class Test06 extends Testing01{

    public Test06 (){
        System.out.println("Test06 - Classes and Objects");

        System.out.println(pInt);
    }

    public class User {
        private String name;

        public User(String name) {

        }

        public void calculate (int a, int b) {
            System.out.println(a+b);
        }

        public void calculate (int a, int b, int c) {
            System.out.println(a+b+c);
        }
    }

    public class Student extends User {
        private ArrayList<String> classes = new ArrayList<String>();
        int number;

        Student (String name, ArrayList<String> classes) {
            super(name);
            this.classes = classes;
            this.number = 10;
        }

        @Override
        public void calculate (int a, int b) {
            System.out.println(a+b+this.number);
        }
    }
}


