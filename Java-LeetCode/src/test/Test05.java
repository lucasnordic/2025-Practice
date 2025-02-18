package test;

import java.util.HashMap;
import java.util.Map;

public class Test05 {
    public Test05 () {
        System.out.println("Test05 - HashMap\n");

        HashMap<String, Double> prices = new HashMap<>();

        prices.put("Microsoft Surface", 20000.0);
        prices.put("MacBook Pro", 15000.0);
        prices.put("iPhone 15", 12000.0);
        prices.put("Samsung Galaxy S23", 9000.0);
        prices.put("Sony PlayStation 5", 5000.0);
        prices.put("Xbox Series X", 5500.0);
        prices.put("Dell XPS 13", 13000.0);
        prices.put("Google Pixel 8", 8000.0);
        prices.putIfAbsent("Nintendo Switch", 3000.0);
        prices.putIfAbsent("Apple Watch Series 8", 8000.0);
        prices.replace("iPhone 15", 11500.0);
        prices.remove("MacBook Pro");

        HashMap<String, Double> morePrices = new HashMap<>();
        prices.putIfAbsent("Bacon", 34.0);
        prices.putAll(morePrices);

        prices.replaceAll((f, p) -> p * 2);

        System.out.printf("%-25s %7s%n", "Product", "Price");
        System.out.println("------------------------------------");

        for(Map.Entry<String, Double> e : prices.entrySet()) {
            System.out.printf("%-25s %10.2f\n", e.getKey(), e.getValue());
        }

        System.out.println();
        System.out.println(prices.containsKey("Dell XPS 13"));
        System.out.println(prices.containsValue(20000.0));
    }
}
