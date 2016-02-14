# Workflow for a song

## Step 1. Add lyrics and translation and align them (aka "Form vertices")

Insert texts into two textareas.

```
Olen lukenut muistelmiasi
en ymmärrä sinua lainkaan
kerrot sodista ja hevosista
vaimostasi on kaksi riviä
lapsistasi ei mitään
```

```
I have read your memoirs
I don't understand you at all
you tell about wars and horses
there is two lines about your wife
nothing about your children
```

Click on `muistelmiasi`, `your` and `memoirs`. Then click on `en`, `I` and `don't`. You will get the following:

```
Olen lukenut muistelmiasi[1]
en[2] ymmärrä sinua lainkaan
kerrot sodista ja hevosista
vaimostasi on kaksi riviä
lapsistasi ei mitään
```

```
I have read your[1] memoirs[1]
I[2] don't[2] understand you at all
you tell about wars and horses
there is two lines about your wife
nothing about your children
```

These numbers are like vertices in the graph. Each grammar cell will also be a vertex. On the step 2 you're going
to create edges between these vertices. Each time you hover over the vertex, it's highlighted with all its adjacent
vertices. That simple!



## Step 2. Add grammar and edges

Switch to "Make edges" mode.

Add a grammar table. Separate the cells with the pipes.

```
Present tense - negative
^Finnish        | ^translation
<em>en</em> ole | - I'm not
<em>et</em> ole | - you're not
<em>ei</em> ole | - he's/she's not
```
Leading `- ` stands for English translation. `<em>` is a canonical highlighter for us.
`^` prepends the header cells.

Now click on `en` inside the lyrics and then on `en ole` in the grammar. Then repeat that with
`ei` and `ei ole`. You should get

```
Olen lukenut muistelmiasi[1]
en[2],[e1] ymmärrä sinua lainkaan
kerrot sodista ja hevosista
vaimostasi on kaksi riviä
lapsistasi ei[e2] mitään
```

```
I have read your[1] memoirs[1]
I[2],[e1] don't[2],[e1] understand you at all
you tell about wars and horses
there is two lines about your wife
nothing about your children
```

```
Present tense - negative
^Finnish            | ^translation
<em>en</em> ole[e1] | - I'm not
<em>et</em> ole     | - you're not
<em>ei</em> ole[e2] | - he's/she's not
```



## Step 3. Deploy

Download the files lipsko.js and lipsko.css. Create your own HTML page. Insert on top of it:
```
<script src="//code.jquery.com/jquery-2.2.0.min.js"></script>
<script src="lipsko.js"></script>
<link href="lipsko.css" rel="stylesheet"/>
```

Then put all the markup like this:
```
<div class="lipsko-text">
Olen lukenut muistelmiasi[1]
en[2],[e1] ymmärrä sinua lainkaan
kerrot sodista ja hevosista
vaimostasi on kaksi riviä
lapsistasi ei[e2] mitään
</div>

<div class="lipsko-text">
I have read your[1] memoirs[1]
I[2],[e1] don't[2],[e1] understand you at all
you tell about wars and horses
there is two lines about your wife
nothing about your children
</div>

<div class="lipsko-table">
Present tense - negative
^Finnish            | ^translation
<em>en</em> ole[e1] | - I'm not
<em>et</em> ole     | - you're not
<em>ei</em> ole[e2] | - he's/she's not
</div>

Deploy and enjoy.
