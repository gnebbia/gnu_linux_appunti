# Bluetooth

We can use graphical tools to make our life easy
by using one of the following tools:
- blueman (with all its tools) and in particular blueman-manager
- blueberry
- gnome-bluetooth


## Manual Configuration
Configuration via CLI
Start the bluetooth.service systemd unit.

Now we can use the bluetoothctl command line utility to pair and connect. For troubleshooting and more detailed explanations of bluetoothctl see the Bluetooth article. Run

```sh
bluetoothctl
```
to be greeted by its internal command prompt. Then enter:
```bluetooth
[bluetooth]# power on
[bluetooth]# agent on
[bluetooth]# default-agent
[bluetooth]# scan on
```

Now make sure that your headset is in pairing mode. It should be
discovered shortly. For example,

[NEW] Device 00:1D:43:6D:03:26 Lasmex LBT10 shows a device that calls
itself "Lasmex LBT10" and has MAC address "00:1D:43:6D:03:26". We will
now use that MAC address to initiate the pairing:

```bluetooth
[bluetooth]# pair 00:1D:43:6D:03:26
```
After pairing, you also need to explicitly connect the device (every time?):
```bluetooth
[bluetooth]# connect 00:1D:43:6D:03:26
```
If you are getting a connection error org.bluez.Error.Failed retry by
killing existing PulseAudio daemon first:

```sh
pulseaudio -k
```
```bluetooth
[bluetooth]# connect 00:1D:43:6D:03:26
```
If everything works correctly, you now have a separate output device
in PulseAudio.

Note: The device may be off by default. Select its audio profile
(OFF, A2DP, HFP) in the "Configuration" tab of pavucontrol. You can
now redirect any audio through that device using the "Playback" and
"Recording" tabs of pavucontrol.
