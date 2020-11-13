# Centralized Smart Dashboard
Centralized Smart Dashboard developed for the rover of Wisconsin Robotics team. 
Iteration number 2 for COMPSCI 506: Software Engineer. 
Code cutoff date: Friday, November 13, 2020

# Prerequisites
[Docker](https://docs.docker.com/get-started)
Notice that currently is only set to work for a unix-based OS. This is fine in our case, since our client's rover runs in a Unix-based OS

# Setup 
The image only needs to be built once, per each new change we make in the container. However, you need to run the image each time.
<ol>
<li> Build docker image: 

```
docker build -t flask-image:latest ./dockerfiles
```
Notice that you might need Admin access
<li> Run image at port 5000:

```
docker run -it -p 5000:5000 -v <path_to_source>:/root flask-image
```
Use a different port if 5000 is busy for you. Replace <path_to_source> to your path to the source of the project. Do not include the < > symbols.

</ol>

# Run app

To manually run the app, run ``` python3 app.py ``` inside your docker container. We might need to create an executable eventually. 

# Ros Setup

Inside your docker container: 

<ol>
<li>

```
source /opt/ros/noetic/setup.bash
```

<li> cd model
<li>
  
```
catkin_make
```
If this command does not work, run ```rosdep update``` and try again.
<li> 

```
source devel/setup.bash
```

<li>
To start the model server, we need to run roscore you can run it in the background using:

```
roscore &
```

# Running the backend tests
```
 cd model/src/centralized_dashboard/src/
```

Inside here, we should find a file called rover.py, which is the one we want to test. Thus, we run:
```
pytest --cov=rover
```

For this iteration, we have achieved an 88% code coverage. 
</ol>
