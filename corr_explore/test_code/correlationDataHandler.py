import pandas as pd
import numpy as np
import yfinance as yf

class correlationDataHandler:
    """
    A data handler for the correlations
    """
    
    def __init__(self, ticker_list: list):
        self.ticker_list = ticker_list
        
    def build_frame(self, period) -> pd.DataFrame:
        """
        Get the values of interest from the list of securities from the user
        """
        
        results = pd.DataFrame()
        
        for ticker in self.ticker_list:
            df = yf.Ticker(ticker).history(period = period, interval = "1d")
            # volume-weighted average price
            df['vwap'] = (df["Volume"] * df["Close"]) / df["Volume"]
            df['returns'] = df["Close"] / df.Close.shift(1) - 1
            df.insert(0, "Ticker", ticker)
            results = pd.concat([results, df])
            
        return results
    
    def clean_frame(self, period) -> pd.DataFrame:
        """
        Clean up the data 
        """
        
        df = self.build_frame(period)
        
        df = df.loc[:, ["Ticker", "vwap"]]
        
        df.dropna(axis = 0, how = "all", inplace = True)
        
        df["date"] = pd.to_datetime(df.index, utc = True).date
        
        df.reset_index(drop = False, inplace = True)
        
        df = pd.pivot(df, index = "date", columns = "Ticker", values = "vwap")
        
        return df
    
    def period_correlations(self, period) -> pd.DataFrame:
        """
        Get the correlations for a given time period
        """
    
        df = self.clean_frame(period)
        
        df = df.rename_axis(None).rename_axis(None, axis=1).corr()
        df = df.stack().reset_index()
        df = pd.DataFrame(df)
        df.columns = ['source', 'target', 'Correlation']
        df = df[df['Correlation'] != 1]
        
        df = df.drop_duplicates()

        df["oneway"] = df.apply(lambda x: not df[
            (df["source"] == x["target"]) & (df["target"] == x["source"]) & (df.index != x.name)].empty,axis=1)

        df = df[df['oneway'] == True].drop("oneway", axis = 1)

        # normalize correlation
        df["norm_corr"] = ((df["Correlation"] - df["Correlation"].mean()) / df["Correlation"].std()).round(3)
        
        df = df.groupby(['source'], as_index = False)['Correlation'].mean().round(3).rename(columns={'source':'name'})

        df = df.drop_duplicates()
        
        df["period"] = period
        
        return df
    
    def get_correlations(self) -> pd.DataFrame:
        """
        loop through all time period of interest and get the correlations into one usable dataframe
        """
        
        periods = ["1mo", "3mo", "6mo", "1y", "2y"]
        results = pd.DataFrame()
        
        for period in periods:
            df = self.period_correlations(period)
            
            results = pd.concat([results, df])
            
        results.reset_index(drop = True)
        
        return results
    
    def get_securities(self) -> list:
        """
        shows the current securities list
        """
        
        return self.ticker_list
    
    def remove_security(self, security_to_remove) -> list:
        """
        removes a security to the list
        """
        
        if security_to_remove in self.ticker_list:
            self.ticker_list.remove(security_to_remove)
            return self.ticker_list
        else:
            return print("The Security isn't in the current list")     
    
    def add_security(self, security_to_add) -> list:
        """
        adds a security to the list
        """
        
        if security_to_add in self.ticker_list:
            return print("The Security is already in the current list")
        else:
            self.ticker_list.append(security_to_add)
            return self.ticker_list