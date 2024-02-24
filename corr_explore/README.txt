# Corr Explore
This project is an effort to display and visualize data using JavaScript's D3 library.
The project features a Python script to pull pricing data (using the yfinance library) and calculate correlation values.

### Objectives
 The goal of this project is to create a visualization tool that allows managers to identify clusters of highly correlated securities within their portfolio.

#### Visual Representation
The approach-in-progress is to display securities as circles, where the size of the circle is proportional to the securities average correlation value.
Forces are currently applied, which make the nodes move around but their interactions/movement doesn't mean anything. Ideally, I would like securities with high degrees of pairwise correlation to cluster together.
High-correlation securities would be coerced towards the center of the page and low-correlation securities would be coerced towards the periphery. 
Specifically, a large circle will be drawn and high-correlation securities will be clustered together near the center and 
low-correlation securities will migrate towards the bounds of the circle.

Long-term vision: include security alpha- and beta- coefficients. A security would be filled with two colors, with one color representing the proportion of stock movement due to the market, 
                and the other color representing the proportion of stock movement due to alpha. This conceptually can tie in the two ideas of correlation and risk decomposition. 
                Managers are already comfortable with the idea of correlation, so expressing the risk decomp through the correlation framework will make the risk decomp more interpretable.

 #### Features:
 1. The upper right hand corner should contain a box that displays the average portfolio correlation. 
    This value should be updated to reflect the securities shown on the page (if a filter is applied to reduce the number of securities on the page, 
    the average should be updated to reflect the new subset).
 2. A slide filter should be included so that managers can set a the threshold correlation value. 
    For example, a manager may want to see the subset of securities with a correlation of 0.5 or greater.
    This will allow managers with large portfolios to explore subsets that matters to them.
3. A selecter to choose the long, short, or total portfolio.

