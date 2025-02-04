package test;

public class Test01 {
    byte lilByte = 1;
    short lilShort = 2;
    char lilChar = 3;
    int number = 4;
    long dong = 5;
    float floaty = 6;
    double dee = 7;
    double deeTwo = 5;

    Double deeDee = 8.0;

    public Test01 () {
        printVariables();
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public void printVariables() {
        System.out.println(lilByte);
        System.out.println(lilShort);
        System.out.println(lilChar + number);
        System.out.println(number);
        System.out.println(dong);
        System.out.println(floaty);
        System.out.println(dee);

        System.out.println(deeDee.describeConstable());
        System.out.println(deeDee % dee);

        System.out.println("Division: " + (8.0 / dong));
    }
}
