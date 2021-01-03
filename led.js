const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server, {origins:'*:*'});
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const cors = require("cors");
const uuid = require("uuid-random");
const port = process.env.PORT || 5000;
const ws281x = require('rpi-ws281x');
const fs = require('fs');

let timer = null;
let config = null;
let pixels = null;
let text = 'duck duck goose! clothes etc. 120 bree street. featuring: beau beau. beautiful boys. good good good. nolusizo weavers. rich mnisi. sindiso khumalo. thebe magugu. the other records. lekker boooiii!!'+ " ";
let loop = null;
let textColor = null;
let backgroundColor = null;
let start = null;
let lengthArray = null;
let totalLength = null;
let speed = null;
let pixelAtRow = null;
let max = null;
let min = null;
let user = 0;

const characters = {
        A: [
          [ 0, 0, 0, 1, 1, 1, 1, 0, 0, 0 ],
          [ 0, 0, 1, 1, 0, 0, 1, 1, 0, 0 ],
          [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
          [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
          [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
          [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
          [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
          [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
          [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
          [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
          [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        ],
        B: [
          [ 0, 1, 1, 1, 1, 1, 1, 0, 0, 0 ],
          [ 0, 1, 1, 1, 1, 1, 1, 1, 0, 0 ],
          [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
          [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
          [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
          [ 0, 1, 1, 1, 1, 1, 1, 1, 0, 0 ],
          [ 0, 1, 1, 0, 0, 0, 0, 1, 0, 0 ],
          [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
          [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
          [ 0, 1, 1, 1, 1, 1, 1, 1, 0, 0 ],
        ],
        C: [
          [ 0, 0, 0, 1, 1, 1, 1, 0, 0, 0 ],
          [ 0, 0, 1, 1, 1, 1, 1, 1, 0, 0 ],
          [ 0, 0, 1, 1, 0, 0, 1, 1, 1, 0 ],
          [ 0, 1, 1, 0, 0, 0, 1, 1, 1, 0 ],
          [ 0, 1, 1, 0, 0, 0, 0, 0, 0, 0 ],
          [ 0, 1, 1, 0, 0, 0, 0, 0, 0, 0 ],
          [ 0, 1, 1, 0, 0, 0, 0, 0, 0, 0 ],
          [ 0, 0, 1, 1, 0, 0, 1, 1, 1, 0 ],
          [ 0, 0, 1, 1, 1, 1, 1, 1, 1, 0 ],
          [ 0, 0, 0, 1, 1, 1, 1, 1, 0, 0 ]
        ],
        D: [
          [ 0, 1, 1, 1, 1, 1, 1, 0, 0, 0 ],
          [ 0, 1, 1, 1, 0, 0, 1, 1, 0, 0 ],
          [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
          [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
          [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
          [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
          [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
          [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
          [ 0, 1, 1, 1, 1, 1, 1, 1, 0, 0 ],
          [ 0, 1, 1, 1, 1, 1, 1, 1, 0, 0 ],
        ],
        E: [
            [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
            [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
            [ 0, 1, 1, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 1, 1, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
            [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
            [ 0, 1, 1, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 1, 1, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
            [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
        ],
        F: [
            [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
            [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
            [ 0, 1, 1, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 1, 1, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 1, 1, 1, 1, 1, 1, 0, 0, 0 ],
            [ 0, 1, 1, 1, 1, 1, 1, 0, 0, 0 ],
            [ 0, 1, 1, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 1, 1, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 1, 1, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 1, 1, 0, 0, 0, 0, 0, 0, 0 ],
          ],
        G: [
            [ 0, 0, 0, 0, 1, 1, 1, 1, 1, 0 ],
            [ 0, 0, 0, 1, 1, 1, 1, 1, 1, 0 ],
            [ 0, 0, 1, 1, 1, 0, 0, 1, 1, 0 ],
            [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
            [ 0, 1, 1, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 1, 1, 0, 0, 0, 1, 1, 1, 0 ],
            [ 0, 1, 1, 0, 0, 0, 1, 1, 1, 0 ],
            [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
            [ 0, 0, 1, 1, 1, 1, 1, 1, 1, 0 ],
            [ 0, 0, 0, 1, 1, 1, 1, 1, 0, 0 ],
        ],
        H: [

              [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
              [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
              [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
              [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
              [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
              [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
              [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
              [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
              [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
              [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
        ],
        I: [

              [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
              [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
              [ 0, 0, 0, 0, 1, 1, 0, 0, 0, 0 ],
              [ 0, 0, 0, 0, 1, 1, 0, 0, 0, 0 ],
              [ 0, 0, 0, 0, 1, 1, 0, 0, 0, 0 ],
              [ 0, 0, 0, 0, 1, 1, 0, 0, 0, 0 ],
              [ 0, 0, 0, 0, 1, 1, 0, 0, 0, 0 ],
              [ 0, 0, 0, 0, 1, 1, 0, 0, 0, 0 ],
              [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
              [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],

        ],
        J: [

              [ 0, 0, 0, 0, 0, 0, 0, 1, 1, 0 ],
              [ 0, 0, 0, 0, 0, 0, 0, 1, 1, 0 ],
              [ 0, 0, 0, 0, 0, 0, 0, 1, 1, 0 ],
              [ 0, 0, 0, 0, 0, 0, 0, 1, 1, 0 ],
              [ 0, 0, 0, 0, 0, 0, 0, 1, 1, 0 ],
              [ 0, 0, 0, 0, 0, 0, 0, 1, 1, 0 ],
              [ 0, 1, 1, 1, 0, 0, 0, 1, 1, 0 ],
              [ 0, 1, 1, 1, 0, 0, 0, 1, 1, 0 ],
              [ 0, 0, 1, 1, 1, 1, 1, 1, 0, 0 ],
              [ 0, 0, 1, 1, 1, 1, 1, 1, 0, 0 ],
        ],
        K: [

              [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
              [ 0, 1, 1, 0, 0, 0, 1, 1, 0, 0 ],
              [ 0, 1, 1, 0, 0, 1, 1, 0, 0, 0 ],
              [ 0, 1, 1, 0, 1, 1, 0, 0, 0, 0 ],
              [ 0, 1, 1, 1, 1, 0, 0, 0, 0, 0 ],
              [ 0, 1, 1, 1, 0, 0, 0, 0, 0, 0 ],
              [ 0, 1, 1, 0, 1, 1, 0, 0, 0, 0 ],
              [ 0, 1, 1, 0, 0, 1, 1, 0, 0, 0 ],
              [ 0, 1, 1, 0, 0, 0, 1, 1, 0, 0 ],
              [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
        ],
        L: [

              [ 0, 1, 1, 0, 0, 0, 0, 0, 0, 0 ],
              [ 0, 1, 1, 9, 0, 0, 0, 0, 0, 0 ],
              [ 0, 1, 1, 0, 0, 0, 0, 0, 0, 0 ],
              [ 0, 1, 1, 0, 0, 0, 0, 0, 0, 0 ],
              [ 0, 1, 1, 0, 0, 0, 0, 0, 0, 0 ],
              [ 0, 1, 1, 0, 0, 0, 0, 0, 0, 0 ],
              [ 0, 1, 1, 0, 0, 0, 0, 0, 0, 0 ],
              [ 0, 1, 1, 0, 0, 0, 0, 0, 0, 0 ],
              [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
              [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
        ],
        M: [

              [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
              [ 0, 1, 1, 1, 0, 0, 1, 1, 1, 0 ],
              [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
              [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
              [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
              [ 0, 1, 1, 0, 1, 1, 0, 1, 1, 0 ],
              [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
              [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
              [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
              [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
        ],
        N: [

              [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
              [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
              [ 0, 1, 1, 1, 0, 0, 0, 1, 1, 0 ],
              [ 0, 1, 1, 1, 0, 0, 0, 1, 1, 0 ],
              [ 0, 1, 1, 0, 1, 0, 0, 1, 1, 0 ],
              [ 0, 1, 1, 0, 1, 1, 0, 1, 1, 0 ],
              [ 0, 1, 1, 0, 0, 1, 1, 1, 1, 0 ],
              [ 0, 1, 1, 0, 0, 0, 1, 1, 1, 0 ],
              [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
              [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
        ],
        O: [

              [ 0, 0, 0, 1, 1, 1, 1, 0, 0, 0 ],
              [ 0, 0, 1, 1, 0, 0, 1, 1, 0, 0 ],
              [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
              [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
              [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
              [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
              [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
              [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
              [ 0, 0, 1, 1, 0, 0, 1, 1, 0, 0 ],
              [ 0, 0, 0, 1, 1, 1, 1, 1, 0, 0 ],
        ],
        P: [

              [ 0, 0, 0, 1, 1, 1, 1, 0, 0, 0 ],
              [ 0, 0, 1, 1, 0, 0, 1, 1, 0, 0 ],
              [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
              [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
              [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
              [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
              [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
              [ 0, 1, 1, 1, 1, 1, 1, 1, 0, 0 ],
              [ 0, 1, 1, 0, 0, 0, 0, 0, 0, 0 ],
              [ 0, 1, 1, 0, 0, 0, 0, 0, 0, 0 ],
              [ 0, 1, 1, 0, 0, 0, 0, 0, 0, 0 ]
        ],
        Q: [

              [ 0, 0, 0, 1, 1, 1, 1, 0, 0, 0 ],
              [ 0, 0, 1, 1, 0, 0, 1, 1, 0, 0 ],
              [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
              [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
              [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
              [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
              [ 0, 1, 1, 0, 1, 1, 1, 1, 1, 0 ],
              [ 0, 1, 1, 0, 1, 1, 1, 1, 1, 0 ],
              [ 0, 1, 1, 0, 0, 0, 1, 1, 0, 0 ],
              [ 0, 0, 1, 1, 1, 1, 1, 0, 1, 0 ],

        ],
        R: [

              [ 0, 1, 1, 1, 1, 1, 1, 1, 0, 0 ],
              [ 0, 1, 1, 1, 0, 0, 1, 1, 0, 0 ],
              [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
              [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
              [ 0, 1, 1, 0, 0, 0, 1, 1, 1, 0 ],
              [ 0, 1, 1, 1, 1, 1, 0, 0, 0, 0 ],
              [ 0, 1, 1, 1, 1, 1, 1, 1, 0, 0 ],
              [ 0, 1, 1, 0, 0, 1, 1, 1, 0, 0 ],
              [ 0, 1, 1, 0, 0, 0, 1, 1, 1, 0 ],
              [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
        ],
        S: [

              [ 0, 0, 1, 1, 1, 1, 1, 1, 0, 0 ],
              [ 0, 0, 1, 1, 1, 1, 1, 1, 0, 0 ],
              [ 0, 1, 1, 1, 0, 0, 0, 1, 1, 0 ],
              [ 0, 1, 1, 1, 0, 0, 0, 0, 0, 0 ],
              [ 0, 1, 1, 1, 1, 1, 1, 1, 0, 0 ],
              [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
              [ 0, 0, 0, 0, 0, 0, 0, 1, 1, 0 ],
              [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
              [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
              [ 0, 0, 0, 1, 1, 1, 1, 1, 0, 0 ]
        ],
        T: [

              [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
              [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
              [ 0, 0, 0, 0, 1, 1, 0, 0, 0, 0 ],
              [ 0, 0, 0, 0, 1, 1, 0, 0, 0, 0 ],
              [ 0, 0, 0, 0, 1, 1, 0, 0, 0, 0 ],
              [ 0, 0, 0, 0, 1, 1, 0, 0, 0, 0 ],
              [ 0, 0, 0, 0, 1, 1, 0, 0, 0, 0 ],
              [ 0, 0, 0, 0, 1, 1, 0, 0, 0, 0 ],
              [ 0, 0, 0, 0, 1, 1, 0, 0, 0, 0 ],
              [ 0, 0, 0, 0, 1, 1, 0, 0, 0, 0 ],
        ],
        U: [
            [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
            [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
            [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
            [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
            [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
            [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
            [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
            [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
            [ 0, 0, 1, 1, 1, 1, 1, 1, 0, 0 ],
            [ 0, 0, 0, 1, 1, 1, 1, 0, 0, 0 ]
        ],
        V: [
          [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
          [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
          [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
          [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
          [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
          [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
          [ 0, 1, 1, 1, 0, 0, 1, 1, 1, 0 ],
          [ 0, 0, 1, 1, 0, 0, 1, 1, 0, 0 ],
          [ 0, 0, 0, 1, 1, 1, 1, 0, 0, 0 ],
          [ 0, 0, 0, 0, 1, 1, 0, 0, 0, 0 ]
        ],
        W: [

              [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
              [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
              [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
              [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
              [ 0, 1, 1, 0, 1, 1, 0, 1, 1, 0 ],
              [ 0, 1, 1, 0, 1, 1, 0, 1, 1, 0 ],
              [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
              [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
              [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
              [ 0, 1, 1, 1, 0, 0, 1, 1, 1, 0 ],
              [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ]
        ],
        X: [

              [ 0, 1, 0, 0, 0, 0, 0, 0, 1, 0 ],
              [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
              [ 0, 0, 1, 1, 0, 0, 1, 1, 0, 0 ],
              [ 0, 0, 0, 1, 1, 1, 1, 0, 0, 0 ],
              [ 0, 0, 0, 0, 1, 1, 0, 0, 0, 0 ],
              [ 0, 0, 0, 0, 1, 1, 0, 0, 0, 0 ],
              [ 0, 0, 0, 1, 1, 1, 1, 0, 0, 0 ],
              [ 0, 0, 1, 1, 0, 0, 1, 1, 0, 0 ],
              [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
              [ 0, 1, 0, 0, 0, 0, 0, 0, 1, 0 ],
        ],
        Y: [

              [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
              [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
              [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
              [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
              [ 0, 0, 1, 1, 0, 0, 1, 1, 0, 0 ],
              [ 0, 0, 0, 0, 1, 1, 0, 0, 0, 0 ],
              [ 0, 0, 0, 0, 1, 1, 0, 0, 0, 0 ],
              [ 0, 0, 0, 0, 1, 1, 0, 0, 0, 0 ],
              [ 0, 0, 0, 0, 1, 1, 0, 0, 0, 0 ],
              [ 0, 0, 0, 0, 1, 1, 0, 0, 0, 0 ],
        ],
        Z: [
            [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
            [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0, 1, 1, 0 ],
            [ 0, 0, 0, 0, 0, 0, 1, 1, 0, 0 ],
            [ 0, 0, 0, 0, 0, 1, 1, 0, 0, 0 ],
            [ 0, 0, 0, 0, 1, 1, 0, 0, 0, 0 ],
            [ 0, 0, 0, 1, 1, 0, 0, 0, 0, 0 ],
            [ 0, 1, 1, 1, 0, 0, 0, 0, 0, 0 ],
            [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
            [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
        ],
        AA: [

              [ 0, 0, 1, 1, 0, 0 ],
              [ 0, 1, 1, 1, 0, 0 ],
              [ 0, 1, 1, 1, 0, 0 ],
              [ 0, 0, 1, 1, 0, 0 ],
              [ 0, 0, 1, 1, 0, 0 ],
              [ 0, 0, 1, 1, 0, 0 ],
              [ 0, 0, 1, 1, 0, 0 ],
              [ 0, 0, 1, 1, 0, 0 ],
              [ 0, 1, 1, 1, 1, 0 ],
              [ 0, 1, 1, 1, 1, 0 ],
        ],
        AB: [
            [ 0, 0, 1, 1, 1, 1, 1, 0, 0, 0 ],
            [ 0, 1, 1, 1, 1, 1, 1, 1, 0, 0 ],
            [ 0, 1, 1, 1, 0, 0, 0, 1, 1, 0 ],
            [ 0, 0, 0, 0, 0, 0, 1, 1, 1, 0 ],
            [ 0, 0, 0, 0, 0, 1, 1, 1, 0, 0 ],
            [ 0, 0, 0, 0, 1, 1, 1, 0, 0, 0 ],
            [ 0, 0, 0, 1, 1, 1, 0, 0, 0, 0 ],
            [ 0, 1, 1, 1, 0, 0, 0, 0, 0, 0 ],
            [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
            [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
        ],
        AC: [
            [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
            [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
            [ 0, 0, 0, 0, 0, 1, 1, 1, 0, 0 ],
            [ 0, 0, 0, 1, 1, 1, 1, 1, 0, 0 ],
            [ 0, 0, 1, 1, 1, 1, 1, 0, 0, 0 ],
            [ 0, 0, 1, 1, 1, 1, 1, 1, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 1, 1, 0, 0 ],
            [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
            [ 0, 1, 1, 1, 0, 0, 0, 1, 1, 0 ],
            [ 0, 0, 1, 1, 1, 1, 1, 1, 0, 0 ],
        ],
        AD: [
            [ 0, 0, 0, 0, 0, 0, 1, 1, 0, 0 ],
            [ 0, 0, 0, 0, 0, 1, 1, 1, 0, 0 ],
            [ 0, 0, 0, 0, 1, 1, 0, 1, 0, 0 ],
            [ 0, 0, 0, 1, 1, 0, 0, 1, 0, 0 ],
            [ 0, 0, 1, 1, 0, 0, 0, 1, 0, 0 ],
            [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
            [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
            [ 0, 0, 0, 0, 0, 0, 1, 1, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 1, 1, 0, 0 ],
            [ 0, 0, 0, 0, 0, 0, 1, 1, 0, 0 ],
        ],
        AE: [
            [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
            [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
            [ 0, 1, 1, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 1, 1, 1, 1, 1, 1, 1, 0, 0 ],
            [ 0, 0, 1, 0, 0, 0, 1, 1, 1, 0 ],
            [ 0, 0, 0, 0, 0, 0, 1, 1, 1, 0 ],
            [ 0, 0, 0, 0, 0, 0, 1, 1, 1, 0 ],
            [ 0, 1, 1, 0, 0, 0, 1, 1, 1, 0 ],
            [ 0, 1, 1, 1, 1, 1, 1, 1, 0, 0 ],
            [ 0, 0, 1, 1, 1, 1, 1, 1, 0, 0 ],
        ],
        AF: [
            [ 0, 0, 0, 0, 0, 0, 1, 1, 0, 0 ],
            [ 0, 0, 0, 0, 0, 1, 1, 1, 0, 0 ],
            [ 0, 0, 0, 1, 1, 1, 1, 0, 0, 0 ],
            [ 0, 0, 1, 1, 1, 0, 0, 0, 0, 0 ],
            [ 0, 1, 1, 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 1, 1, 1, 1, 1, 1, 1, 0, 0 ],
            [ 0, 1, 1, 1, 0, 0, 0, 1, 1, 0 ],
            [ 0, 1, 1, 1, 0, 0, 0, 1, 1, 0 ],
            [ 0, 1, 1, 1, 0, 0, 0, 1, 1, 0 ],
            [ 0, 0, 1, 1, 1, 1, 1, 1, 0, 0 ],
        ],
        AG: [
            [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
            [ 0, 1, 1, 0, 0, 0, 1, 1, 1, 0 ],
            [ 0, 1, 1, 0, 0, 0, 1, 1, 0, 0 ],
            [ 0, 0, 0, 0, 0, 1, 1, 0, 0, 0 ],
            [ 0, 0, 0, 0, 1, 1, 0, 0, 0, 0 ],
            [ 0, 0, 0, 1, 1, 0, 0, 0, 0, 0 ],
            [ 0, 0, 1, 1, 1, 0, 0, 0, 0, 0 ],
            [ 0, 0, 1, 1, 1, 0, 0, 0, 0, 0 ],
            [ 0, 0, 1, 1, 1, 0, 0, 0, 0, 0 ],
            [ 0, 0, 1, 1, 1, 0, 0, 0, 0, 0 ],
        ],
        AH: [
            [ 0, 1, 1, 1, 1, 1, 1, 1, 0, 0 ],
            [ 0, 1, 1, 0, 0, 0, 1, 1, 0, 0 ],
            [ 0, 1, 1, 0, 0, 0, 1, 1, 0, 0 ],
            [ 0, 0, 1, 1, 0, 1, 1, 0, 0, 0 ],
            [ 0, 0, 0, 0, 1, 1, 0, 0, 0, 0 ],
            [ 0, 0, 0, 1, 1, 1, 0, 0, 0, 0 ],
            [ 0, 0, 1, 1, 0, 1, 1, 1, 0, 0 ],
            [ 0, 0, 1, 1, 0, 0, 0, 1, 1, 0 ],
            [ 0, 0, 1, 1, 0, 0, 0, 1, 1, 0 ],
            [ 0, 0, 1, 1, 1, 1, 1, 1, 0, 0 ],
        ],
        AI: [
            [ 0, 0, 1, 1, 1, 1, 1, 1, 0, 0 ],
            [ 0, 1, 1, 1, 1, 1, 1, 1, 0, 0 ],
            [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
            [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
            [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
            [ 0, 0, 1, 1, 1, 1, 1, 1, 1, 0 ],
            [ 0, 0, 0, 0, 0, 1, 1, 1, 1, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0, 1, 0, 0 ],
            [ 0, 0, 0, 0, 0, 1, 1, 1, 0, 0 ],
            [ 0, 0, 1, 1, 1, 1, 1, 1, 0, 0 ],
        ],
        AJ: [
              [ 0, 0, 0, 1, 1, 1, 1, 0, 0, 0 ],
              [ 0, 0, 1, 1, 0, 0, 1, 1, 0, 0 ],
              [ 0, 1, 1, 0, 0, 0, 1, 1, 1, 0 ],
              [ 0, 1, 1, 0, 0, 1, 0, 1, 1, 0 ],
              [ 0, 1, 1, 0, 1, 0, 0, 1, 1, 0 ],
              [ 0, 1, 1, 1, 0, 0, 0, 1, 1, 0 ],
              [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
              [ 0, 1, 1, 0, 0, 0, 0, 1, 1, 0 ],
              [ 0, 0, 1, 1, 0, 0, 1, 1, 0, 0 ],
              [ 0, 0, 0, 1, 1, 1, 1, 1, 0, 0 ],
        ],
        BA: [
              [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
              [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
              [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
              [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
              [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
              [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
              [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
              [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
              [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
              [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        ],
        BB: [
              [ 0, 0, 0, 0 ],
              [ 0, 0, 0, 0 ],
              [ 0, 0, 0, 0 ],
              [ 0, 0, 0, 0 ],
              [ 0, 0, 0, 0 ],
              [ 0, 0, 0, 0 ],
              [ 0, 0, 0, 0 ],
              [ 0, 0, 0, 0 ],
              [ 0, 1, 1, 0 ],
              [ 0, 1, 1, 0 ],
        ],
        BC: [
              [ 0, 1, 1, 0 ],
              [ 0, 1, 1, 0 ],
              [ 0, 1, 1, 0 ],
              [ 0, 1, 1, 0 ],
              [ 0, 1, 1, 0 ],
              [ 0, 1, 1, 0 ],
              [ 0, 0, 0, 0 ],
              [ 0, 0, 0, 0 ],
              [ 0, 1, 1, 0 ],
              [ 0, 1, 1, 0 ],
        ],
        BD: [
              [ 0, 0, 0, 0, 0, 0, 0, 0 ],
              [ 0, 0, 0, 0, 0, 0, 0, 0 ],
              [ 0, 0, 0, 0, 0, 0, 0, 0 ],
              [ 0, 0, 0, 0, 0, 0, 0, 0 ],
              [ 0, 1, 1, 1, 1, 1, 1, 0 ],
              [ 0, 1, 1, 1, 1, 1, 1, 0 ],
              [ 0, 0, 0, 0, 0, 0, 0, 0 ],
              [ 0, 0, 0, 0, 0, 0, 0, 0 ],
              [ 0, 0, 0, 0, 0, 0, 0, 0 ],
              [ 0, 0, 0, 0, 0, 0, 0, 0 ],
        ],
        BE: [
              [ 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0 ],
              [ 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0 ],
              [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
              [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
              [ 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0 ],
              [ 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0 ],
              [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
              [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
              [ 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0 ],
              [ 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0 ],
        ],
        BF: [
          [ 0, 0, 0, 1, 1, 1, 1, 0, 0, 0 ],
          [ 0, 1, 0, 0, 0, 0, 0, 1, 0, 0 ],
          [ 0, 1, 0, 1, 1, 1, 1, 0, 1, 0 ],
          [ 0, 1, 0, 1, 0, 0, 1, 0, 1, 0 ],
          [ 0, 1, 0, 1, 0, 0, 1, 0, 1, 0 ],
          [ 0, 1, 0, 1, 0, 0, 1, 0, 1, 0 ],
          [ 0, 1, 0, 1, 1, 1, 1, 1, 1, 0 ],
          [ 0, 1, , 0, 0, 0, 0, 0, 0, 0 ],
          [ 0, 0, 1, 0, 0, 0, 0, 0, 0, 0 ],
          [ 0, 0, 0, 1, 1, 1, 1, 0, 0, 0 ]
        ],
    }

config = {};
config.leds = 500;
config.dma = 10;
config.brightness = 255;
config.gpio = 18;
config.type = 'rgb';
ws281x.configure(config);
pixels = new Uint32Array(config.leds);
start = 0;
off();
loop = 1;
textColor = randomRGBA();
backgroundColor = 0x000000;
color = 0xFBD11;
speed = 0.000000001;

//all on
function allon(){
  backgroundColor = randomRGBA();
  for(var i = 0; i<500; i++){
    pixels[i] = backgroundColor;
  }
  ws281x.render(pixels);
}

//switch off
function off(){
  for (var i = 0; i < config.leds; i++){
    pixels[i] = 0x111111;
  }
  ws281x.render(pixels);
}

//scroll text
function scroll(){
  //allon();
  while(loop>0){
    try {
      text = fs.readFileSync('text.txt', { encoding: 'utf8' });
      textColor = fs.readFileSync('color.txt', { encoding: 'utf8' });
      backgroundColor = fs.readFileSync('background.txt', { encoding: 'utf8' })
      textColor = "0x"+textColor;
      backgroundColor = "0x" + backgroundColor;
      text = text + " ";
      //console.log(text, color, background);
    } catch(err) {
      console.error(err);
    }

    let textArray = text.split('');
    totalLength = 200;
    //get length of text
    for(var x = 0; x < textArray.length; x++){
      if(textArray[x] === "a" || textArray[x] === "A"){
        lengthArray = characters.A;
        totalLength = totalLength + lengthArray[0].length;
      }

      if(textArray[x] === "b" || textArray[x] === "B"){
        lengthArray = characters.B;
        totalLength = totalLength + lengthArray[0].length;
      }

      if(textArray[x] === "c" || textArray[x] === "C"){
        lengthArray = characters.C;
        totalLength = totalLength + lengthArray[0].length;
      }

      if(textArray[x] === "d" || textArray[x] === "D"){
        lengthArray = characters.D;
        totalLength = totalLength + lengthArray[0].length;
      }

      if(textArray[x] === "e" || textArray[x] === "E"){
        lengthArray = characters.E;
        totalLength = totalLength + lengthArray[0].length;
      }

      if(textArray[x] === "f" || textArray[x] === "F"){
        lengthArray = characters.F;
        totalLength = totalLength + lengthArray[0].length;
      }

      if(textArray[x] === "g" || textArray[x] === "G"){
        lengthArray = characters.G;
        totalLength = totalLength + lengthArray[0].length;
      }

      if(textArray[x] === "h" || textArray[x] === "H"){
        lengthArray = characters.H;
        totalLength = totalLength + lengthArray[0].length;
      }

      if(textArray[x] === "i" || textArray[x] === "I"){
        lengthArray = characters.I;
        totalLength = totalLength + lengthArray[0].length;
      }

      if(textArray[x] === "j" || textArray[x] === "J"){
        lengthArray = characters.J;
        totalLength = totalLength + lengthArray[0].length;
      }

      if(textArray[x] === "k" || textArray[x] === "K"){
        lengthArray = characters.K;
        totalLength = totalLength + lengthArray[0].length;
      }

      if(textArray[x] === "l" || textArray[x] === "L"){
        lengthArray = characters.L;
        totalLength = totalLength + lengthArray[0].length;
      }

      if(textArray[x] === "m" || textArray[x] === "M"){
        lengthArray = characters.M;
        totalLength = totalLength + lengthArray[0].length;
      }

      if(textArray[x] === "o" || textArray[x] === "O"){
        lengthArray = characters.O;
        totalLength = totalLength + lengthArray[0].length;
      }

      if(textArray[x] === "p" || textArray[x] === "P"){
        lengthArray = characters.P;
        totalLength = totalLength + lengthArray[0].length;
      }

      if(textArray[x] === "q" || textArray[x] === "Q"){
        lengthArray = characters.R;
        totalLength = totalLength + lengthArray[0].length;
      }

      if(textArray[x] === "s" || textArray[x] === "S"){
        lengthArray = characters.S;
        totalLength = totalLength + lengthArray[0].length;
      }

      if(textArray[x] === "t" || textArray[x] === "T"){
        lengthArray = characters.T;
        totalLength = totalLength + lengthArray[0].length;
      }

      if(textArray[x] === "u" || textArray[x] === "U"){
        lengthArray = characters.U;
        totalLength = totalLength + lengthArray[0].length;
      }

      if(textArray[x] === "v" || textArray[x] === "V"){
        lengthArray = characters.V;
        totalLength = totalLength + lengthArray[0].length;
      }

      if(textArray[x] === "w" || textArray[x] === "W"){
        lengthArray = characters.W;
        totalLength = totalLength + lengthArray[0].length;
      }

      if(textArray[x] === "x" || textArray[x] === "X"){
        lengthArray = characters.X;
        totalLength = totalLength + lengthArray[0].length;
      }

      if(textArray[x] === "y" || textArray[x] === "Y"){
        lengthArray = characters.Y;
        totalLength = totalLength + lengthArray[0].length;
      }

      if(textArray[x] === "z" || textArray[x] === "Z"){
        lengthArray = characters.Z;
        totalLength = totalLength + lengthArray[0].length;
      }

      if(textArray[x] === "1" || textArray[x] === 1){
        lengthArray = characters.AA;
        totalLength = totalLength + lengthArray[0].length;
      }

      if(textArray[x] === "2" || textArray[x] === 2){
        lengthArray = characters.AB;
        totalLength = totalLength + lengthArray[0].length;
      }

      if(textArray[x] === "3" || textArray[x] === 3){
        lengthArray = characters.AC;
        totalLength = totalLength + lengthArray[0].length;
      }

      if(textArray[x] === "4" || textArray[x] === 4){
        lengthArray = characters.AD;
        totalLength = totalLength + lengthArray[0].length;
      }

      if(textArray[x] === "5" || textArray[x] === 5){
        lengthArray = characters.AE;
        totalLength = totalLength + lengthArray[0].length;
      }

      if(textArray[x] === "6" || textArray[x] === 6){
        lengthArray = characters.AF;
        totalLength = totalLength + lengthArray[0].length;
      }

      if(textArray[x] === "7" || textArray[x] === 7){
        lengthArray = characters.AG;
        totalLength = totalLength + lengthArray[0].length;
      }

      if(textArray[x] === "8" || textArray[x] === 8){
        lengthArray = characters.AH;
        totalLength = totalLength + lengthArray[0].length;
      }

      if(textArray[x] === "9" || textArray[x] === 9){
        lengthArray = characters.AI;
        totalLength = totalLength + lengthArray[0].length;
      }

      if(textArray[x] === "0" || textArray[x] === 0){
        lengthArray = characters.AJ;
        totalLength = totalLength + lengthArray[0].length;
      }

      if(textArray[x] === " "){
        lengthArray = characters.BA;
        totalLength = totalLength + lengthArray[0].length;
      }

      if(textArray[x] === "."){
        lengthArray = characters.BB;
        totalLength = totalLength + lengthArray[0].length;
      }

      if(textArray[x] === "!"){
        lengthArray = characters.BC;
        totalLength = totalLength + lengthArray[0].length;
      }

      if(textArray[x] === "-"){
        lengthArray = characters.BD;
        totalLength = totalLength + lengthArray[0].length;
      }

      if(textArray[x] === "#"){
        lengthArray = characters.BE;
        totalLength = totalLength + lengthArray[0].length;
      }

      if(textArray[x] === "@"){
        lengthArray = characters.BF;
        totalLength = totalLength + lengthArray[0].length;
      }
    }

    for(var x = 49; x > -(totalLength); x--){
      convertToText(x);
      var waitTill = new Date(new Date().getTime() + speed * 1000);
      while(waitTill > new Date()){}
      ws281x.render(pixels);
    }
  }
}

//get rgba
function randomRGBA() {
    var o = Math.round, r = Math.random, s = 255
    return Number((o(r()*s)) + '' + (o(r()*s)) + '' + (o(r()*s)));
}

//convert text
function convertToText(position){
  let textArray = text.split('');
  let length_ = null;

  for(var x = 0; x < textArray.length; x++){
    if(textArray[x] === "a" || textArray[x] === "A"){
      draw(characters.A, position);
      length_ = characters.A;
      position = position + length_[0].length;
    }

    if(textArray[x] === "b" || textArray[x] === "B"){
      draw(characters.B, position);
      length_ = characters.B;
      position = position + length_[0].length;
    }

    if(textArray[x] === "c" || textArray[x] === "C"){
      draw(characters.C, position);
      length_ = characters.C;
      position = position + length_[0].length;
    }

    if(textArray[x] === "d" || textArray[x] === "D"){
      draw(characters.D, position);
      length_ = characters.D;
      position = position + length_[0].length;
    }

    if(textArray[x] === "e" || textArray[x] === "E"){
      draw(characters.E, position);
      length_ = characters.E;
      position = position + length_[0].length;
    }

    if(textArray[x] === "f" || textArray[x] === "F"){
      draw(characters.F, position);
      length_ = characters.F;
      position = position + length_[0].length;
    }

    if(textArray[x] === "g" || textArray[x] === "G"){
      draw(characters.G, position);
      length_ = characters.G;
      position = position + length_[0].length;
    }

    if(textArray[x] === "h" || textArray[x] === "H"){
      draw(characters.H, position);
      length_ = characters.H;
      position = position + length_[0].length;
    }

    if(textArray[x] === "i" || textArray[x] === "I"){
      draw(characters.I, position);
      length_ = characters.I;
      position = position + length_[0].length;
    }

    if(textArray[x] === "j" || textArray[x] === "J"){
      draw(characters.J, position);
      length_ = characters.J;
      position = position + length_[0].length;
    }

    if(textArray[x] === "k" || textArray[x] === "K"){
      draw(characters.K, position);
      length_ = characters.K;
      position = position + length_[0].length;
    }

    if(textArray[x] === "l" || textArray[x] === "L"){
      draw(characters.L, position);
      length_ = characters.L;
      position = position + length_[0].length;
    }

    if(textArray[x] === "m" || textArray[x] === "M"){
      draw(characters.M, position);
      length_ = characters.M;
      position = position + length_[0].length;
    }

    if(textArray[x] === "n" || textArray[x] === "N"){
      draw(characters.N, position);
      length_ = characters.N;
      position = position + length_[0].length;
    }

    if(textArray[x] === "o" || textArray[x] === "O"){
      draw(characters.O, position);
      length_ = characters.O;
      position = position + length_[0].length;
    }

    if(textArray[x] === "p" || textArray[x] === "P"){
      draw(characters.P, position);
      length_ = characters.P;
      position = position + length_[0].length;
    }

    if(textArray[x] === "q" || textArray[x] === "Q"){
      draw(characters.Q, position);
      length_ = characters.Q;
      position = position + length_[0].length;
    }

    if(textArray[x] === "r" || textArray[x] === "R"){
      draw(characters.R, position);
      length_ = characters.R;
      position = position + length_[0].length;
    }

    if(textArray[x] === "s" || textArray[x] === "S"){
      draw(characters.S, position);
      length_ = characters.S;
      position = position + length_[0].length;
    }

    if(textArray[x] === "t" || textArray[x] === "T"){
      draw(characters.T, position);
      length_ = characters.T;
      position = position + length_[0].length;
    }

    if(textArray[x] === "u" || textArray[x] === "U"){
      draw(characters.U, position);
      length_ = characters.U;
      position = position + length_[0].length;
    }

    if(textArray[x] === "v" || textArray[x] === "V"){
      draw(characters.V, position);
      length_ = characters.V;
      position = position + length_[0].length;
    }

    if(textArray[x] === "w" || textArray[x] === "W"){
      draw(characters.W, position);
      length_ = characters.W;
      position = position + length_[0].length;
    }

    if(textArray[x] === "x" || textArray[x] === "X"){
      draw(characters.X, position);
      length_ = characters.X;
      position = position + length_[0].length;
    }

    if(textArray[x] === "y" || textArray[x] === "Y"){
      draw(characters.Y, position);
      length_ = characters.Y;
      position = position + length_[0].length;
    }

    if(textArray[x] === "z" || textArray[x] === "Z"){
      draw(characters.Z, position);
      length_ = characters.Z;
      position = position + length_[0].length;
    }

    if(textArray[x] === "1" || textArray[x] === 1){
      draw(characters.AA, position);
      length_ = characters.AA;
      position = position + length_[0].length;
    }

    if(textArray[x] === "2" || textArray[x] === 2){
      draw(characters.AB, position);
      length_ = characters.AB;
      position = position + length_[0].length;
    }

    if(textArray[x] === "3" || textArray[x] === 3){
      draw(characters.AC, position);
      length_ = characters.AC;
      position = position + length_[0].length;
    }

    if(textArray[x] === "4" || textArray[x] === 4){
      draw(characters.AD, position);
      length_ = characters.AD;
      position = position + length_[0].length;
    }

    if(textArray[x] === "5" || textArray[x] === 5){
      draw(characters.AE, position);
      length_ = characters.AE;
      position = position + length_[0].length;
    }

    if(textArray[x] === "6" || textArray[x] === 6){
      draw(characters.AF, position);
      length_ = characters.AF;
      position = position + length_[0].length;
    }

    if(textArray[x] === "7" || textArray[x] === 7){
      draw(characters.AG, position);
      length_ = characters.AG;
      position = position + length_[0].length;
    }

    if(textArray[x] === "8" || textArray[x] === 8){
      draw(characters.AH, position);
      length_ = characters.AH;
      position = position + length_[0].length;
    }

    if(textArray[x] === "9" || textArray[x] === 9){
      draw(characters.AI, position);
      length_ = characters.AI;
      position = position + length_[0].length;
    }

    if(textArray[x] === "0" || textArray[x] === 0){
      draw(characters.AJ, position);
      length_ = characters.AJ;
      position = position + length_[0].length;
    }

    if(textArray[x] === " "){
      draw(characters.BA, position);
      length_ = characters.BA;
      position = position + length_[0].length;
    }

    if(textArray[x] === "."){
      draw(characters.BB, position);
      length_ = characters.BB;
      position = position + length_[0].length;
    }

    if(textArray[x] === "!"){
      draw(characters.BC, position);
      length_ = characters.BC;
      position = position + length_[0].length;
    }

    if(textArray[x] === "-"){
      draw(characters.BD, position);
      length_ = characters.BD;
      position = position + length_[0].length;
    }

    if(textArray[x] === "#"){
      draw(characters.BE, position);
      length_ = characters.BE;
      position = position + length_[0].length;
    }

    if(textArray[x] === "@"){
      draw(characters.BF, position);
      length_ = characters.BF;
      position = position + length_[0].length;
    }
  }
}

//swap colors
function colorSwap(a, b){
  var temp = a;
  backgroundColor = b
  textColor = temp
}

//draw characters
function draw(character, position){
  let len = 0;
  len = character.length;
  len = len + 0;
  for(var y = 0; y < len; y++){
    pixelAtRow = character[y];
    max = y*50+49;
    min = y*50;
    let positionx = min + position;
    let positionx_ = max - position;
    for(var x = 0; x < pixelAtRow.length; x++){
        //if(y === 0 || y === 2 || y===4 || y === 6 || y === 8 || y === 10){
            if(pixelAtRow[x] === 0 && positionx <= max && positionx >= min){
              if(y % 2 === 0){
                pixels[positionx] = backgroundColor;
                positionx ++;
                positionx_++;
              }

              if(y % 2 === 1){
                pixels[positionx_] = backgroundColor;
                positionx ++;
                positionx_--;
              }
            }

            else if(pixelAtRow[x] === 1 && positionx <= max && positionx >= min){
              if(y % 2 === 0){
                pixels[positionx] = textColor;
                positionx ++;
                positionx_--;
              }

              if(y % 2 === 1){
                pixels[positionx_] = textColor;
                positionx ++
                positionx_--;
              }
            }

            else{
              if(y === 0 && positionx < min){
                pixels[positionx] = backgroundColor;
                positionx ++;
              }
              if(y === 2 && positionx < min){
                pixels[positionx] = backgroundColor;
                positionx ++;
              }

              if(y === 4 && positionx < min){
                pixels[positionx] = backgroundColor;
                positionx ++;
              }

              if(y === 6 && positionx < min){
                pixels[positionx] = backgroundColor;
                positionx ++;
              }

              if(y === 8 && positionx < min){
                pixels[positionx] = backgroundColor;
                positionx ++;
              }

              //fix for greater than 10
              /*if(y === 8 && positionx < min){
                pixels[positionx] = backgroundColor;
                positionx ++;
              }*/
            }

        }
  }
};

//scroll text
scroll();
