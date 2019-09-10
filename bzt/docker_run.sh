#!/bin/bash
DIR="$( cd "$(dirname "$0")" ; pwd -P )"

cd $DIR/


docker build -t carsbzt .

docker run --network="host" -it carsbzt
