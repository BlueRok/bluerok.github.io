try: # Python 2
	import Tkinter as tk 
	import tkFont as font
except ImportError: # Python 3
	import tkinter as tk
	import tkinter.font as font

def change():
	label['text'] = "lollllllllllll"


root = tk.Tk()
root.title("Server")
SCREEN_WIDTH = int(root.winfo_screenwidth() / 2)
SCREEN_HEIGHT = int(root.winfo_screenheight())
root.geometry(str(SCREEN_WIDTH) + "x" + str(SCREEN_HEIGHT))
root.minsize(150, 150) # Change later
root.grid_columnconfigure(0, weight=1)

FRAME_FONT = font.Font(family="Helvetica", size=30)
BUTTON_FONT = font.Font(family="Helvetica", size=20)
LABEL_FONT = font.Font(family="Helvetica", size=20)

soFrame = tk.LabelFrame(root, text="Server Options", font=FRAME_FONT, bd=1, relief=tk.GROOVE)
soFrame.grid(row=0, column=0)

soButtonPadX, soButtonPadY = (20, 10), 10
runButton = tk.Button(soFrame, text="Run Server", font=BUTTON_FONT, command=change)
runButton.grid(row=0, column=0, padx=soButtonPadX, pady=soButtonPadY)

killButton = tk.Button(soFrame, text="Kill Server", font=BUTTON_FONT, command=change)
killButton.grid(row=0, column=1, padx=soButtonPadX[::-1], pady=soButtonPadY)

connFrame = tk.LabelFrame(root, text="Connections", font=FRAME_FONT, bd=1, relief=tk.GROOVE)
connFrame.grid(row=1, column=0)
connFrame.grid_columnconfigure(0, weight=1)
connFrame.grid_columnconfigure(1, weight=1)

numConnLabel = tk.Label(connFrame, text="Number of connections: 0", font=LABEL_FONT)
numConnLabel.grid(row=0, column=0, sticky="e")

viewConnButton = tk.Label(connFrame, text="View", font=BUTTON_FONT)
viewConnButton.grid(row=0, column=1, sticky="w")

tk.mainloop()
