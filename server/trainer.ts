import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid';
import { Buffer, emptyBuffer } from './buffer';
import { startTraining } from '../training/learning/training';
import { createQTable } from '../training/learning/q-table';
import { actionsCount } from '../training/domain/actions';
import { obstaclesCount } from '../training/domain/obstacles';
import { Config, defaultConfig } from '../training/learning/config';
import { relativePositionCount } from '../training/domain/relative-position';

const app = express();
const port = 3000;

const buffers = new Map<string, Buffer>();

const parseIntOrDefault = (value: string, defaultValue: number): number => value ? Number.parseInt(value) : defaultValue;
const parseFloatOrDefault = (value: string, defaultValue: number): number => value ? Number.parseFloat(value) : defaultValue;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// GET endpoint

app.get('/start', (req: Request, res: Response) => {
  const id = uuidv4();
  const buffer = emptyBuffer(id);

  const boardSize = parseIntOrDefault(req.query.boardSize as string, defaultConfig.boardSize);
  const episodes = parseIntOrDefault(req.query.episodes as string, defaultConfig.episodes);
  const epsilon = parseFloatOrDefault(req.query.epsilon as string, defaultConfig.epsilon);
  const discountFactor = parseFloatOrDefault(req.query.discountFactor as string, defaultConfig.discountFactor);
  const learningRate = parseFloatOrDefault(req.query.learningRate as string, defaultConfig.learningRate);
  const episodeTimeout = parseIntOrDefault(req.query.episodeTimeout as string, defaultConfig.episodeTimeout);
  const actionTimeout = parseIntOrDefault(req.query.actionTimeout as string, defaultConfig.actionTimeout);
  const maxActionsPerIteration = parseIntOrDefault(req.query.maxActionsPerIteration as string, defaultConfig.maxActionsPerIteration);

  const config = <Config>{
    ...defaultConfig,
    boardSize,
    episodes: episodes,
    epsilon,
    discountFactor,
    learningRate,
    episodeTimeout,
    actionTimeout,
    maxActionsPerIteration
  };

  buffer.config = config;

  const table = createQTable(relativePositionCount, obstaclesCount, actionsCount);
  startTraining(table, config, (arg) => {
    buffer.iteration = arg.episode + 1;
    buffer.maxLength = buffer.maxLength > arg.snake.length ? buffer.maxLength : arg.snake.length;
    buffer.qTable = arg.qTable,
    buffer.endTime = new Date()
  });
  buffers.set(id, buffer);
  res.send(`${id}`);
});

app.get('/details/:id', (req: Request, res: Response) => {
  const id = req.params.id;

  const buffer = buffers.get(id);
  if (!buffer) {
    res.status(404).send(`Not found: ${id}`);
  } else {
    res.send(buffer);
  }
});

app.get('/details', (req: Request, res: Response) => {
  const result = [...buffers.values()].map(e=>({...e,qTable: null}));

  res.send(result);
});

app.get('/qtable/:id', (req: Request, res: Response) => {
  const id = req.params.id;

  const buffer = buffers.get(id);
  if (!buffer) {
    res.status(404).send(`Not found: ${id}`);
  } else {
    res.send(buffer.qTable);
  }
});

app.get('/ids', (req: Request, res: Response) => {
  const ids = [...buffers.keys()];
    res.send(ids);
});

app.get('/clean', (req: Request, res: Response) => {
  buffers.clear();
    res.send();
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
