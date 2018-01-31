import Koa from 'koa';
import Poloniex from 'poloniex-api-node';
import autobahn from 'autobahn';

const WS_URI = 'wss://api2.poloniex.com';
const app = new Koa();

// response
app.use(ctx => {
  ctx.body = 'Hello Koa Stuff';
});

app.listen(80);

const poloniex = new Poloniex();

poloniex.subscribe('ticker');
poloniex.subscribe('BTC_ETH');

poloniex.on('message', (channelName, data, seq) => {
  if (channelName === 'ticker') {
    console.log(`Ticker: ${JSON.stringify(data)}`);
  }

  if (channelName === 'BTC_ETH') {
    console.log(`order book and trade updates received for currency pair ${channelName}`);
    console.log(`data sequence number is ${seq}`);
  }
});

poloniex.on('open', () => {
  console.log(`Poloniex WebSocket connection open`);
});

poloniex.on('close', (reason, details) => {
  console.log(`Poloniex WebSocket connection disconnected`);
});

poloniex.on('error', (error) => {
  console.log(`An error has occured`);
});

poloniex.openWebSocket({ version: 2 });
