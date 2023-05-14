import pandas as pd
import yfinance as yf
import numpy as np


tickers = ['SSSS', 'GBDC', 'POLY.L', 'TEK.AX', 'SKF.AX', 'PSDN', 'VRNOF']

### Initial Operations
def returns(df):
    """
    close-to-close returns
    """
    return df.Close / df.Close.shift(1) - 1


def vwap(df):
    """
    volume-weighted average price 
    """
    return (df.Volume * df.Close) / df.Volume 


def get_ticker_history_and_process(
        ticker:str, 
        period:str, 
        interval:str):
        
    # Get ticker history
    df = yf.Ticker(ticker).history(period=period, interval = interval)
    
    # Remove cases where volume is zero
    df = df[df['Volume'] != 0]
    df['vwap'] = vwap(df)
    df['returns'] = returns(df)
    #check_returns(df)

    df.insert(0, "ticker", ticker)
    #df = generate_features(df) ### COMMENT IN WHEN RUNNING
    return df


def build_frame(
    tickers:list,
    period:str = '2y',
    interval:str = '1d',
    verbose: bool() = False
    ):

    results = pd.DataFrame()

    for ticker in tickers:
        assert len(ticker) != 1, f"Ticker in Tickers being read as: {ticker}. \n If entering single ticker, use list brackets."
        # Get ticker history
        df = yf.Ticker(ticker).history(period=period, interval = interval)
        df['vwap'] = vwap(df)
        df['returns'] = returns(df)
        df.insert(0, "Ticker", ticker)
        results = pd.concat([results, df])
    
    print("Shape of Final df:", results.shape)
    return results

df = build_frame(tickers)
df = df.loc[:, ['Ticker', 'vwap']]

df.dropna(axis = 0, how = 'all', inplace=True)

df['date'] = pd.to_datetime(df.index, utc = True).date
df.reset_index(drop = False, inplace = True)
#df.drop(['Date'], axis = 1, inplace = True)

print(df.columns, "\n", df.index)

df = pd.pivot(df, index = 'date', columns = 'Ticker', values = 'vwap')

print(df.columns)

# Create correlation plot
df = df.rename_axis(None).rename_axis(None, axis=1).corr()
df = df.stack().reset_index()
df = pd.DataFrame(df)
df.columns = ['source', 'target', 'Correlation']
df = df[df['Correlation'] != 1]

df = df.drop_duplicates()

df["oneway"] = df.apply(lambda x: not df[
                    (df["source"] == x["target"]) & (df["target"] == x["source"]) & (df.index != x.name)].empty,axis=1)

df = df[df['oneway'] == True].drop("oneway", axis = 1)

df.to_csv("ticker_corr2.csv", index = False)

df = df.groupby(['source'], as_index = False).mean().round(3).rename(columns={'source':'name'})

df = df.drop_duplicates()

df.to_csv("ticker_nodes.csv")