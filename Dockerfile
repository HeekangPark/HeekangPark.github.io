FROM ubuntu:20.04

ENV ruby_ver="2.7.2"

RUN apt-get update \
  && apt-get upgrade -y \
  && apt-get install -y zlib1g-dev build-essential vim git curl gpg-agent gnupg2 make

# install rvm
RUN curl -sSL https://rvm.io/pkuczynski.asc | gpg2 --import - \
  && curl -sSL https://get.rvm.io | bash -s stable

SHELL ["/bin/bash", "-l", "-c"]

# install ruby, jekyll, bundler
RUN export LANG="C.UTF-8" \
  && export LANGUAGE="C.UTF-8" \
  && export LC_ALL="C.UTF-8" \
  && rvm install ${ruby_ver} \
  && rvm use --default ${ruby_ver} \
  && rvm cleanup all \
  && gem install jekyll bundler

# set environments
RUN echo 'PATH="/usr/local/rvm/gems/ruby-2.7.2/bin:/usr/local/rvm/gems/ruby-2.7.2@global/bin:/usr/local/rvm/rubies/ruby-2.7.2/bin:/usr/local/rvm/bin:$PATH"' >> ~/.bashrc \
  && echo 'export LANG="C.UTF-8"' >> ~/.bashrc \
  && echo 'export LC_ALL="C.UTF-8"' >> ~/.bashrc \
  && echo 'export LANGUAGE="C.UTF-8"' >> ~/.bashrc

ADD . /jekyll
WORKDIR /jekyll

RUN if [ -f Gemfile.lock ]; then rm Gemfile.lock; fi \
  && bundle install

EXPOSE 4000 4001