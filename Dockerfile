# Robot Framework with Firefox 51 and Google Chrome 56
#
# Usage example:
#   docker run -ti --rm -e BROWSER=(Chrome|Firefox)
#              -v $(pwd)/test:/opt/robotframework/tests:Z
#              -v $(pwd)/reports:/opt/robotframework/reports:Z <IMAGE>
#
# Copyright (c) 2016 Paul Podgorsek
# Copyright (c) 2017 Tuomas Starck
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.

FROM fedora:25

LABEL maintainer="cusku@starck.fi"

VOLUME /opt/robotframework/tests
VOLUME /opt/robotframework/reports

COPY docker/google-chrome.repo /etc/yum.repos.d/google-chrome.repo

RUN dnf upgrade -y
RUN dnf install -y firefox-52.0-1.fc25 \
        chromedriver-56.0.2924.87-3.fc25 google-chrome-stable-57.0.2987.98-1 \
        python-pip-8.1.2-2.fc25 xorg-x11-server-Xvfb-1.19.1-3.fc25
RUN dnf clean all

RUN pip install --upgrade pip
RUN pip install robotframework==3.0.2 robotframework-selenium2library==1.8.0

COPY docker/google-chrome.sh /opt/robotframework/bin/google-chrome
RUN chmod 755 /opt/robotframework/bin/google-chrome

RUN mv /opt/google/chrome/google-chrome /opt/google/chrome/google-chrome-original && \
    ln -sf /opt/robotframework/bin/google-chrome /opt/google/chrome/google-chrome

RUN mkdir -p /opt/robotframework/drivers
ADD https://github.com/mozilla/geckodriver/releases/download/v0.15.0/geckodriver-v0.15.0-linux64.tar.gz /tmp
RUN tar xzvf /tmp/geckodriver-v0.15.0-linux64.tar.gz -C /opt/robotframework/drivers

ENV PATH=/opt/robotframework/bin:/opt/robotframework/drivers:$PATH

ENTRYPOINT ["xvfb-run", "--server-args=-screen 0 1440x900x24 -ac", "robot", "--outputDir", "/opt/robotframework/reports", "/opt/robotframework/tests"]
