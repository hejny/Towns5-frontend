#!/bin/bash

# load env variables from .env file, altogether with ssh private key
export $(cat .env | xargs)

if [ "$GIT_SSH_KEY" != "" ]; then
  echo "Detected SSH key for git. Adding SSH config" >&1
  echo "" >&1

# Ensure we have the ssh folder
  if [ ! -d ~/.ssh ]; then
    mkdir -p ~/.ssh
    chmod 700 ~/.ssh
  fi

  # Load the private key into a file.
  echo $GIT_SSH_KEY | base64 --decode > ~/.ssh/towns

  # Change the permissions on the file to
  # be read-write for this user.
  chmod 600 ~/.ssh/towns

  # Setup the ssh config file.
  # Switch out the hostname for different hosts.
  echo -e "Host bitbucket.org\n"\
          " IdentityFile ~/.ssh/towns\n"\
          " IdentitiesOnly yes\n"\
          " UserKnownHostsFile=/dev/null\n"\
          " StrictHostKeyChecking no"\
          > ~/.ssh/config

  chmod 600 ~/.ssh/config
fi