import { LearningPath, ConceptNode, NotificationItem } from '../types';

export const SEED_CONCEPTS: ConceptNode[] = [
  {
    id: 'concept-ai-basics',
    name: 'Artificial Intelligence',
    category: 'AI Fundamentals',
    description: 'The science and engineering of making intelligent computer systems capable of tasks requiring human-like cognition.',
    difficulty: 'Beginner',
    prerequisites: [],
    relatedConcepts: ['Machine Learning', 'Deep Learning', 'Generative AI'],
    lessonId: 'lesson-what-is-ai',
  },
  {
    id: 'concept-ml',
    name: 'Machine Learning',
    category: 'AI Fundamentals',
    description: 'Subfield of AI where algorithms learn statistical patterns from data rather than following explicit rule-based programming.',
    difficulty: 'Beginner',
    prerequisites: ['Artificial Intelligence'],
    relatedConcepts: ['Deep Learning', 'Supervised Learning', 'Neural Networks'],
    lessonId: 'lesson-ai-vs-ml',
  },
  {
    id: 'concept-neural-networks',
    name: 'Neural Networks',
    category: 'AI Fundamentals',
    description: 'Interconnected layers of mathematical nodes inspired by biological neurons that transform input signals into learned outputs.',
    difficulty: 'Beginner',
    prerequisites: ['Machine Learning'],
    relatedConcepts: ['Deep Learning', 'Transformers', 'Backpropagation'],
    lessonId: 'lesson-neural-networks',
  },
  {
    id: 'concept-llm',
    name: 'Large Language Models (LLMs)',
    category: 'ChatGPT & LLMs',
    description: 'Massive transformer-based neural networks trained on vast text corpora to understand, predict, and generate human language.',
    difficulty: 'Beginner',
    prerequisites: ['Neural Networks', 'Machine Learning'],
    relatedConcepts: ['Tokens', 'Context Windows', 'Transformers', 'Prompt Engineering'],
    lessonId: 'lesson-what-is-llm',
  },
  {
    id: 'concept-tokens',
    name: 'Tokens & Tokenization',
    category: 'ChatGPT & LLMs',
    description: 'The atomic sub-word fragments and numerical representations that language models use to ingest, compute, and output text.',
    difficulty: 'Beginner',
    prerequisites: ['Large Language Models (LLMs)'],
    relatedConcepts: ['Context Windows', 'Embeddings', 'Vocabulary Size'],
    lessonId: 'lesson-how-tokens-work',
  },
  {
    id: 'concept-transformers',
    name: 'Transformers & Self-Attention',
    category: 'AI Engineering',
    description: 'The foundational neural architecture using self-attention mechanisms to weigh relationships across all words in a sequence simultaneously.',
    difficulty: 'Intermediate',
    prerequisites: ['Neural Networks', 'Tokens & Tokenization'],
    relatedConcepts: ['Large Language Models (LLMs)', 'Context Windows', 'Multi-Head Attention'],
    lessonId: 'lesson-transformer-architecture',
  },
  {
    id: 'concept-prompt-engineering',
    name: 'Prompt Engineering',
    category: 'Prompt Engineering',
    description: 'The practice of structuring, framing, and refining inputs to guide foundation models toward precise, high-reliability outputs.',
    difficulty: 'Beginner',
    prerequisites: ['Large Language Models (LLMs)'],
    relatedConcepts: ['Few-Shot Prompting', 'Chain of Thought', 'System Prompts'],
    lessonId: 'lesson-prompt-engineering-core',
  },
  {
    id: 'concept-rag',
    name: 'Retrieval-Augmented Generation (RAG)',
    category: 'Building AI Applications',
    description: 'An architectural pattern that dynamically retrieves trusted external knowledge documents and injects them into the model context before generating answers.',
    difficulty: 'Intermediate',
    prerequisites: ['Large Language Models (LLMs)', 'Embeddings', 'Vector Databases'],
    relatedConcepts: ['Vector Databases', 'Embeddings', 'Context Windows', 'Hallucinations'],
    lessonId: 'lesson-what-is-rag',
  },
  {
    id: 'concept-embeddings',
    name: 'Vector Embeddings',
    category: 'Building AI Applications',
    description: 'High-dimensional numerical representations of text or multimodal data where semantic similarity correlates with geometric proximity.',
    difficulty: 'Intermediate',
    prerequisites: ['Machine Learning', 'Tokens & Tokenization'],
    relatedConcepts: ['Retrieval-Augmented Generation (RAG)', 'Vector Databases', 'Cosine Similarity'],
    lessonId: 'lesson-vector-embeddings',
  },
  {
    id: 'concept-vector-db',
    name: 'Vector Databases',
    category: 'Building AI Applications',
    description: 'Specialized database systems designed for fast indexing, storage, and approximate nearest neighbor (ANN) retrieval of high-dimensional vectors.',
    difficulty: 'Intermediate',
    prerequisites: ['Vector Embeddings'],
    relatedConcepts: ['Retrieval-Augmented Generation (RAG)', 'Semantic Search', 'Hybrid Search'],
    lessonId: 'lesson-vector-databases',
  },
  {
    id: 'concept-ai-agents',
    name: 'AI Agents & Autonomous Loops',
    category: 'AI Agents',
    description: 'Systems where an LLM is paired with memory, planning loops, and external tools to accomplish multi-step goals autonomously.',
    difficulty: 'Intermediate',
    prerequisites: ['Large Language Models (LLMs)', 'Prompt Engineering'],
    relatedConcepts: ['Tool Calling', 'ReAct Framework', 'Multi-Agent Systems'],
    lessonId: 'lesson-ai-agents-intro',
  },
  {
    id: 'concept-tool-calling',
    name: 'Function & Tool Calling',
    category: 'AI Agents',
    description: 'The ability of an LLM to generate structured API calls and inspect return values to interact with databases, web services, and external tools.',
    difficulty: 'Intermediate',
    prerequisites: ['Large Language Models (LLMs)', 'AI Agents & Autonomous Loops'],
    relatedConcepts: ['Structured Outputs', 'APIs', 'Agentic Workflows'],
    lessonId: 'lesson-tool-calling-explained',
  },
  {
    id: 'concept-hallucinations',
    name: 'AI Hallucinations & Grounding',
    category: 'Generative AI',
    description: 'The phenomenon where probabilistic models generate plausible-sounding but factually false or ungrounded assertions.',
    difficulty: 'Beginner',
    prerequisites: ['Large Language Models (LLMs)'],
    relatedConcepts: ['Retrieval-Augmented Generation (RAG)', 'AI Evaluation', 'Temperature'],
    lessonId: 'lesson-ai-hallucinations',
  },
  {
    id: 'concept-context-windows',
    name: 'Context Windows & Long-Context',
    category: 'ChatGPT & LLMs',
    description: 'The maximum token capacity a model can consider during a single inference call, determining working memory span and attention depth.',
    difficulty: 'Intermediate',
    prerequisites: ['Tokens & Tokenization', 'Transformers & Self-Attention'],
    relatedConcepts: ['Needle in a Haystack', 'Prompt Caching', 'Lost in the Middle'],
    lessonId: 'lesson-context-windows',
  },
  {
    id: 'concept-fine-tuning',
    name: 'Fine-Tuning vs RAG vs Prompting',
    category: 'AI Engineering',
    description: 'The strategic decision matrix between tailoring model weights via gradient updates, providing dynamic runtime context via RAG, or zero/few-shot prompt engineering.',
    difficulty: 'Advanced',
    prerequisites: ['Prompt Engineering', 'Retrieval-Augmented Generation (RAG)', 'Neural Networks'],
    relatedConcepts: ['LoRA', 'RLHF', 'Domain Adaptation'],
    lessonId: 'lesson-finetuning-vs-rag',
  },
  {
    id: 'concept-ai-evals',
    name: 'AI Evaluation & Benchmarking',
    category: 'AI Engineering',
    description: 'Systematic frameworks, automated test suites, and LLM-as-a-judge pipelines used to measure accuracy, safety, and regression in AI systems.',
    difficulty: 'Advanced',
    prerequisites: ['Large Language Models (LLMs)', 'Prompt Engineering'],
    relatedConcepts: ['LLM-as-a-Judge', 'Evals Datasets', 'Hallucinations'],
    lessonId: 'lesson-ai-evaluations',
  },
];

export const SEED_LEARNING_PATHS: LearningPath[] = [
  {
    id: 'path-1',
    slug: 'ai-for-absolute-beginners',
    title: 'AI for Absolute Beginners',
    tagline: 'From zero knowledge to an intuitive grasp of how modern AI really works.',
    description: 'A gentle, jargon-free introduction to artificial intelligence, everyday applications, and separating reality from hype.',
    difficulty: 'Beginner',
    category: 'AI Fundamentals',
    estimatedHours: 2.5,
    totalLessons: 4,
    icon: 'Sparkles',
    featured: true,
    orderIndex: 1,
    status: 'published',
    modules: [
      {
        id: 'mod-1-1',
        pathId: 'path-1',
        title: 'Core Concepts',
        description: 'Demystifying the foundational language of intelligence.',
        orderIndex: 1,
        lessons: [
          {
            id: 'lesson-what-is-ai',
            slug: 'what-is-artificial-intelligence',
            moduleId: 'mod-1-1',
            pathId: 'path-1',
            title: 'What Is Artificial Intelligence?',
            tagline: 'Understanding the shift from deterministic code to pattern prediction.',
            difficulty: 'Beginner',
            category: 'AI Fundamentals',
            estimatedMinutes: 6,
            orderIndex: 1,
            status: 'published',
            bigIdea: 'Artificial Intelligence is not magic or a thinking soul; it is software that learns patterns from data to make predictions and decisions.',
            whyItMatters: 'Every modern industry is being reshaped by probabilistic software. Knowing what AI is—and what it is not—empowers you to make smart strategic choices without fear or hype.',
            simpleExplanation: 'Traditional software is like a recipe: a programmer writes step-by-step instructions ("if user clicks this, do that"). If a situation isn’t in the recipe, the software fails. AI is like showing a child thousands of photos of cats and dogs until the child learns to spot the differences on their own without needing every rule spelled out.',
            realWorldExample: {
              scenario: 'A spam filter in your email inbox.',
              impact: 'Instead of an engineer writing rules for every spam word in existence, the AI analyzes millions of known spam and legitimate emails to spot subtle patterns and catch new scams automatically.',
            },
            keyIdeas: [
              { title: 'Pattern Recognition', summary: 'AI models excel at detecting mathematical relationships across vast collections of text, images, and numbers.' },
              { title: 'Probabilistic, Not Deterministic', summary: 'AI calculates the most likely correct response rather than following rigid, hardcoded boolean logic.' },
              { title: 'Data as the Blueprint', summary: 'An AI is only as capable and unbiased as the quality and diversity of the data used to train it.' }
            ],
            visualExplanation: {
              type: 'comparison',
              title: 'Traditional Programming vs. Machine Learning',
              content: 'Compare how traditional rule-based code operates against data-driven machine learning models.',
              items: [
                { label: 'Traditional Code', detail: 'Rules + Data = Answers (Requires manual rules for every case)' },
                { label: 'Machine Learning', detail: 'Data + Answers = Rules (Algorithm figures out the underlying rules)' }
              ]
            },
            goDeeper: 'In 1950, Alan Turing proposed the Turing Test, asking whether a machine could imitate human conversation convincingly. Today, modern AI focuses primarily on Narrow AI (systems optimized for specific tasks like translation or medical imaging) rather than Artificial General Intelligence (AGI).',
            keyTakeaways: [
              'AI is fundamentally mathematical pattern recognition trained on vast datasets.',
              'Traditional software executes explicit human rules; AI models infer rules from examples.',
              'Current AI systems are Narrow AI: highly capable at specific tasks, but lack conscious general reasoning.'
            ],
            applyIt: {
              prompt: 'Identify one tool you use daily (e.g., Spotify, Netflix, Google Maps, Apple Photos) and describe how AI replaces manual rules with pattern prediction.',
              actionSteps: [
                'Choose a software tool you interact with daily.',
                'Identify what inputs it receives (e.g., songs you skip, routes you take).',
                'Explain what output it predicts for you.'
              ],
              reflectionQuestion: 'How would this tool behave if engineers had to manually hardcode every recommendation rule by hand?'
            },
            quiz: {
              id: 'quiz-what-is-ai',
              lessonId: 'lesson-what-is-ai',
              title: 'Knowledge Check: What Is AI?',
              questions: [
                {
                  id: 'q1',
                  questionText: 'What is the fundamental difference between traditional software and machine learning?',
                  type: 'multiple_choice',
                  options: [
                    { id: 'opt1', text: 'Traditional software runs faster, while AI runs only on supercomputers.' },
                    { id: 'opt2', text: 'Traditional software follows explicit hardcoded rules, whereas AI learns patterns and rules from data.' },
                    { id: 'opt3', text: 'AI can think emotionally, whereas traditional code cannot.' },
                    { id: 'opt4', text: 'Traditional software uses electricity, while AI operates purely in the cloud.' }
                  ],
                  correctOptionId: 'opt2',
                  explanation: 'Traditional software requires developers to program every rule explicitly. AI algorithms infer the underlying relationships directly from data.'
                },
                {
                  id: 'q2',
                  questionText: 'Which category best describes today’s state-of-the-art AI systems like ChatGPT and Google Gemini?',
                  type: 'multiple_choice',
                  options: [
                    { id: 'opt1', text: 'Artificial General Intelligence (AGI)' },
                    { id: 'opt2', text: 'Sentient Artificial Superintelligence' },
                    { id: 'opt3', text: 'Narrow / Specialized AI systems' },
                    { id: 'opt4', text: 'Deterministic Rule Engines' }
                  ],
                  correctOptionId: 'opt3',
                  explanation: 'Despite their impressive language and multimodal capabilities, today\'s models are narrow AI systems executing statistical predictions, not conscious general intelligences.'
                },
                {
                  id: 'q3',
                  questionText: 'True or False: An AI model calculates probability distributions to choose outputs rather than guaranteeing rigid certainty.',
                  type: 'true_false',
                  options: [
                    { id: 'opt1', text: 'True' },
                    { id: 'opt2', text: 'False' }
                  ],
                  correctOptionId: 'opt1',
                  explanation: 'AI models are fundamentally probabilistic engines calculating statistical likelihoods across potential outputs.'
                }
              ]
            },
            sources: [
              { title: 'Computing Machinery and Intelligence', author: 'Alan Turing', type: 'paper' },
              { title: 'Artificial Intelligence: A Modern Approach', author: 'Stuart Russell & Peter Norvig', type: 'book' }
            ],
            nextLessonId: 'lesson-ai-vs-ml'
          },
          {
            id: 'lesson-ai-vs-ml',
            slug: 'ai-vs-machine-learning',
            moduleId: 'mod-1-1',
            pathId: 'path-1',
            title: 'AI vs Machine Learning vs Deep Learning',
            tagline: 'Untangling the nested hierarchy of artificial intelligence.',
            difficulty: 'Beginner',
            category: 'AI Fundamentals',
            estimatedMinutes: 7,
            orderIndex: 2,
            status: 'published',
            bigIdea: 'AI is the overarching umbrella discipline; Machine Learning is the primary statistical approach to achieving it; Deep Learning is the specialized technique powering today’s breakthroughs.',
            whyItMatters: 'Media coverage often treats AI, ML, and Deep Learning as interchangeable buzzwords. Knowing their precise relationship helps you evaluate technical claims and tools accurately.',
            simpleExplanation: 'Think of Russian nesting dolls. The largest doll is Artificial Intelligence (any technique that enables computers to mimic intelligence). Inside that is Machine Learning (learning from data). Inside that is Deep Learning (using multi-layered neural networks inspired by the human brain).',
            realWorldExample: {
              scenario: 'Medical image diagnosis for detecting anomalies in MRI scans.',
              impact: 'A general AI goal (automate diagnostics) is solved using Deep Learning (convolutional and transformer neural networks) trained on hundreds of thousands of historical scans.',
            },
            keyIdeas: [
              { title: 'The Nesting Hierarchy', summary: 'Deep Learning ⊂ Machine Learning ⊂ Artificial Intelligence.' },
              { title: 'Feature Engineering Shift', summary: 'Classical ML required humans to manually select data features; Deep Learning automatically extracts complex features through layered representations.' },
              { title: 'Compute & Data Scale', summary: 'Deep Learning models require immense compute (GPUs/TPUs) and vast training datasets to unlock non-linear representations.' }
            ],
            visualExplanation: {
              type: 'architecture',
              title: 'The AI Nesting Structure',
              content: 'Visualizing the concentric hierarchy from broad field to specific architectures.',
              items: [
                { label: 'AI (Broadest)', detail: 'Search algorithms, expert systems, robotics, ML' },
                { label: 'Machine Learning (Subset)', detail: 'Decision trees, regression, random forests, clustering' },
                { label: 'Deep Learning (Core Subset)', detail: 'Multi-layer neural networks, CNNs, Transformers, LLMs' }
              ]
            },
            goDeeper: 'Classical Machine Learning (like Linear Regression or Support Vector Machines) plateaus in performance as data volume increases. Deep Learning architectures, by contrast, continue to improve dramatically as you scale parameters and training tokens.',
            keyTakeaways: [
              'AI includes all intelligent machine behaviors, including older rule-based algorithms.',
              'Machine Learning specifically relies on statistical learning from training data.',
              'Deep Learning uses layered neural networks to process raw unstructured data like text, audio, and images.'
            ],
            applyIt: {
              prompt: 'Categorize three common systems into AI, Classical ML, or Deep Learning.',
              actionSteps: [
                'Chess algorithm from 1997 (Deep Blue): Rule-based AI search trees.',
                'Predicting house prices from square footage: Classical Machine Learning regression.',
                'Generating a hyper-realistic image of a sunset: Deep Learning diffusion model.'
              ],
              reflectionQuestion: 'Why did deep learning take off in the 2010s rather than the 1980s?'
            },
            quiz: {
              id: 'quiz-ai-vs-ml',
              lessonId: 'lesson-ai-vs-ml',
              title: 'Knowledge Check: AI Hierarchy',
              questions: [
                {
                  id: 'q1',
                  questionText: 'Which statement accurately describes the relationship between AI, Machine Learning (ML), and Deep Learning (DL)?',
                  type: 'multiple_choice',
                  options: [
                    { id: 'opt1', text: 'ML and DL are competing alternatives to AI.' },
                    { id: 'opt2', text: 'DL is a subset of ML, which in turn is a subset of AI.' },
                    { id: 'opt3', text: 'AI is a modern subset of Deep Learning.' },
                    { id: 'opt4', text: 'ML applies only to robotics, while AI applies only to language.' }
                  ],
                  correctOptionId: 'opt2',
                  explanation: 'Deep Learning is a specific technique within Machine Learning, which is a broader subfield of Artificial Intelligence.'
                },
                {
                  id: 'q2',
                  questionText: 'What key advantage does Deep Learning have over classical Machine Learning for tasks like image recognition and language?',
                  type: 'multiple_choice',
                  options: [
                    { id: 'opt1', text: 'It requires zero training data.' },
                    { id: 'opt2', text: 'It can automatically learn hierarchical feature representations directly from raw data.' },
                    { id: 'opt3', text: 'It is 100% deterministic and never makes probabilistic errors.' },
                    { id: 'opt4', text: 'It runs without any mathematical computation.' }
                  ],
                  correctOptionId: 'opt2',
                  explanation: 'Deep learning extracts layered hierarchical features (e.g. edges -> shapes -> object parts) directly from raw inputs without manual feature engineering.'
                }
              ]
            },
            sources: [
              { title: 'Deep Learning', author: 'Ian Goodfellow, Yoshua Bengio, Aaron Courville', type: 'book' }
            ],
            nextLessonId: 'lesson-neural-networks'
          },
          {
            id: 'lesson-neural-networks',
            slug: 'what-is-a-neural-network',
            moduleId: 'mod-1-1',
            pathId: 'path-1',
            title: 'What Is a Neural Network?',
            tagline: 'How layers of connected math nodes learn complex relationships.',
            difficulty: 'Beginner',
            category: 'AI Fundamentals',
            estimatedMinutes: 8,
            orderIndex: 3,
            status: 'published',
            bigIdea: 'A neural network is a mathematical network of interconnected nodes (weights and biases) that transforms raw inputs into accurate predictions through repeated adjustments.',
            whyItMatters: 'Neural networks are the foundational engine beneath ChatGPT, self-driving cars, voice assistants, and medical diagnostic AI.',
            simpleExplanation: 'Imagine a giant choir where each singer adjusts their volume knob. At first, the sound is chaotic noise. A conductor listens, notes the dissonance, and tells individual singers to tweak their volume up or down. After millions of tiny adjustments, the choir harmonizes flawlessly. In a neural network, the singers are "weights", the conductor is the "loss function", and the adjustments are called "backpropagation".',
            realWorldExample: {
              scenario: 'Handwriting recognition on smartphone touchscreens.',
              impact: 'As you draw a messy letter "A", the network passes pixel brightness values through layers that detect line slants, crossbars, and vertices to classify the letter instantly.',
            },
            keyIdeas: [
              { title: 'Inputs, Hidden Layers & Outputs', summary: 'Data flows forward through interconnected layers, each extracting increasingly abstract representations.' },
              { title: 'Weights and Biases', summary: 'The adjustable parameters (the "dials") that determine how strongly one node influences the next.' },
              { title: 'Loss & Backpropagation', summary: 'The mathematical feedback loop that calculates error and adjusts parameters to reduce mistakes.' }
            ],
            visualExplanation: {
              type: 'flow',
              title: 'Information Flow in Neural Networks',
              content: 'Step-by-step path of signal transformation from input to prediction.',
              items: [
                { label: 'Input Layer', detail: 'Ingests raw numerical data (pixels, audio frequencies, tokens)' },
                { label: 'Hidden Layers', detail: 'Applies weighted sums and non-linear activation functions (ReLU, GELU)' },
                { label: 'Output Layer', detail: 'Generates probability distribution across target classes or tokens' }
              ]
            },
            goDeeper: 'Non-linear activation functions (like Sigmoid, ReLU, or SwiGLU) are essential. Without non-linearities, no matter how many layers you stack, the entire neural network would collapse mathematically into a simple single-layer linear regression.',
            keyTakeaways: [
              'Neural networks are stacks of mathematical equations tuned to minimize prediction error.',
              'Training is the process of finding the optimal numerical values for billions of weights.',
              'Activation functions introduce non-linearity, enabling networks to model complex real-world phenomena.'
            ],
            applyIt: {
              prompt: 'Think of an image classification task (e.g., distinguishing apples from oranges). Describe what early layers might look for vs. what deeper layers look for.',
              actionSteps: [
                'Layer 1: Detects color gradients and edge contrasts.',
                'Layer 2: Combines edges into curves and textures (smooth skin vs. dimpled peel).',
                'Final Layer: Combines shape and texture into a final probability score.'
              ],
              reflectionQuestion: 'Why does increasing the number of parameters make a model more expressive?'
            },
            quiz: {
              id: 'quiz-neural-networks',
              lessonId: 'lesson-neural-networks',
              title: 'Knowledge Check: Neural Networks',
              questions: [
                {
                  id: 'q1',
                  questionText: 'What are the tunable numerical values in a neural network called that get adjusted during training?',
                  type: 'multiple_choice',
                  options: [
                    { id: 'opt1', text: 'HTML tags' },
                    { id: 'opt2', text: 'Weights and Biases' },
                    { id: 'opt3', text: 'Hard drives' },
                    { id: 'opt4', text: 'Clock frequencies' }
                  ],
                  correctOptionId: 'opt2',
                  explanation: 'Weights and biases are the mathematical parameters adjusted by training algorithms to minimize prediction error.'
                },
                {
                  id: 'q2',
                  questionText: 'What is the purpose of backpropagation in training a neural network?',
                  type: 'multiple_choice',
                  options: [
                    { id: 'opt1', text: 'To delete unused training files from the server.' },
                    { id: 'opt2', text: 'To calculate how much each weight contributed to the error and update it.' },
                    { id: 'opt3', text: 'To encrypt the user\'s passwords.' },
                    { id: 'opt4', text: 'To convert text into spoken audio.' }
                  ],
                  correctOptionId: 'opt2',
                  explanation: 'Backpropagation computes the gradient of the loss function with respect to each weight, allowing gradient descent to optimize parameters.'
                }
              ]
            },
            nextLessonId: 'lesson-what-is-generative-ai'
          },
          {
            id: 'lesson-what-is-generative-ai',
            slug: 'what-is-generative-ai',
            moduleId: 'mod-1-1',
            pathId: 'path-1',
            title: 'What Is Generative AI?',
            tagline: 'Moving from AI that classifies to AI that creates new content.',
            difficulty: 'Beginner',
            category: 'Generative AI',
            estimatedMinutes: 6,
            orderIndex: 4,
            status: 'published',
            bigIdea: 'Discriminative AI analyzes and categorizes existing data; Generative AI synthesizes novel text, code, audio, and visual artifacts that never existed before.',
            whyItMatters: 'Generative AI turns computers from passive calculation engines into collaborative thought partners, creative synthesizers, and productive assistants.',
            simpleExplanation: 'Discriminative AI is like an art critic: it looks at a painting and says, "This is a Monet." Generative AI is like an apprentice artist: after studying thousands of Impressionist paintings, it paints a brand-new masterpiece in Monet\'s style on request.',
            realWorldExample: {
              scenario: 'Drafting customer support replies or creating concept art in seconds.',
              impact: 'Instead of starting with a blank page, professionals can prompt an AI for 5 distinct variations, then refine and polish the best version.',
            },
            keyIdeas: [
              { title: 'Synthesis Over Classification', summary: 'Generative models learn the underlying probability distribution of data to sample entirely new instances.' },
              { title: 'Multimodal Capabilities', summary: 'Modern generative models seamlessly handle text, code, images, video, and audio.' },
              { title: 'Next-Item Prediction', summary: 'At its core, a generative language model repeatedly asks: "Given everything written so far, what word comes next?"' }
            ],
            visualExplanation: {
              type: 'comparison',
              title: 'Discriminative vs Generative AI',
              content: 'Understanding the core behavioral paradigm shift in AI.',
              items: [
                { label: 'Discriminative AI', detail: 'Input: Image of dog -> Output: "Dog" (P(Y|X))' },
                { label: 'Generative AI', detail: 'Input: "Draw a golden retriever" -> Output: Novel high-res image (P(X|Y) or P(X))' }
              ]
            },
            goDeeper: 'Generative AI relies on architectures such as Autoregressive Transformers (for language and code), Diffusion Models (for imagery and video), and Generative Adversarial Networks (GANs).',
            keyTakeaways: [
              'Generative AI models create original content by predicting probabilities learned during training.',
              'It represents a paradigm shift from passive data classification to active content synthesis.',
              'Outputs are novel combinations of learned statistical patterns, not simple copy-paste retrievals.'
            ],
            applyIt: {
              prompt: 'Identify three workflows in your organization where generative synthesis could save hours of blank-page paralysis.',
              actionSteps: [
                'Writing initial draft communications or press releases.',
                'Brainstorming product naming concepts and user persona scenarios.',
                'Summarizing lengthy transcripts into action items.'
              ],
              reflectionQuestion: 'Why is human review critical when using generative AI for high-stakes decisions?'
            },
            quiz: {
              id: 'quiz-genai',
              lessonId: 'lesson-what-is-generative-ai',
              title: 'Knowledge Check: Generative AI',
              questions: [
                {
                  id: 'q1',
                  questionText: 'How does Generative AI differ fundamentally from Discriminative AI?',
                  type: 'multiple_choice',
                  options: [
                    { id: 'opt1', text: 'Generative AI classifies data, while Discriminative AI creates new content.' },
                    { id: 'opt2', text: 'Generative AI creates novel text, images, or code, while Discriminative AI predicts labels or categories.' },
                    { id: 'opt3', text: 'Generative AI does not require any training data.' },
                    { id: 'opt4', text: 'Discriminative AI only works on quantum computers.' }
                  ],
                  correctOptionId: 'opt2',
                  explanation: 'Discriminative models categorize or score inputs (e.g. spam / not spam), while generative models produce new data samples.'
                }
              ]
            },
            nextLessonId: 'lesson-what-is-llm'
          }
        ]
      }
    ]
  },
  {
    id: 'path-2',
    slug: 'ai-foundations',
    title: 'AI Foundations',
    tagline: 'The comprehensive technical backbone of modern artificial intelligence.',
    description: 'Master the fundamental mechanics: LLMs, Tokenization, Transformers, and Context Windows.',
    difficulty: 'Beginner',
    category: 'AI Fundamentals',
    estimatedHours: 3.5,
    totalLessons: 4,
    icon: 'Layers',
    featured: true,
    orderIndex: 2,
    status: 'published',
    modules: [
      {
        id: 'mod-2-1',
        pathId: 'path-2',
        title: 'Modern Foundation Models',
        description: 'How modern Large Language Models operate under the hood.',
        orderIndex: 1,
        lessons: [
          {
            id: 'lesson-what-is-llm',
            slug: 'what-is-an-llm',
            moduleId: 'mod-2-1',
            pathId: 'path-2',
            title: 'What Is a Large Language Model (LLM)?',
            tagline: 'Understanding the scale, training phases, and mechanics of modern LLMs.',
            difficulty: 'Beginner',
            category: 'ChatGPT & LLMs',
            estimatedMinutes: 8,
            orderIndex: 1,
            status: 'published',
            bigIdea: 'An LLM is a giant transformer neural network trained on trillions of words to compress human knowledge into statistical weights and generate coherent text.',
            whyItMatters: 'LLMs are the operating system of generative AI. Understanding their two main phases—Pre-training and Post-training—explains why they can write poetry, code software, and also occasionally hallucinate.',
            simpleExplanation: 'Think of an LLM as the ultimate auto-complete. If you feed it 10 trillion words of books, websites, and code, it develops an astonishingly deep understanding of grammar, facts, reasoning patterns, and idioms just by practicing the game of predicting the very next word.',
            realWorldExample: {
              scenario: 'Asking an AI to debug Python code and explain the error in plain English.',
              impact: 'The model has seen millions of code snippets, error tracebacks, and StackOverflow discussions, allowing it to correlate the bug with its standard fix.',
            },
            keyIdeas: [
              { title: 'Pre-Training (Knowledge Ingestion)', summary: 'Self-supervised learning on massive web-scale text where the model learns world facts, language structure, and reasoning styles.' },
              { title: 'Post-Training (Instruction Tuning & RLHF)', summary: 'Fine-tuning with human feedback to turn a raw text-completion engine into a safe, helpful assistant.' },
              { title: 'Emergent Capabilities', summary: 'As model size and data scale increase, new capabilities (like multi-step reasoning, translation, and coding) appear unexpectedly.' }
            ],
            visualExplanation: {
              type: 'flow',
              title: 'The Two-Stage Training Pipeline',
              content: 'How raw web text becomes a polished conversational assistant.',
              items: [
                { label: '1. Pre-Training', detail: 'Trillions of raw tokens -> Base Foundation Model (Unfiltered text predictor)' },
                { label: '2. Supervised Fine-Tuning (SFT)', detail: 'High-quality Q&A pairs -> Instruction-Following Model' },
                { label: '3. RLHF / DPO', detail: 'Human preference scoring -> Aligned, safe, and helpful Assistant' }
              ]
            },
            goDeeper: 'Base models (before RLHF alignment) will simply complete text rather than answer questions. For example, if you ask a base model "What is the capital of France?", it might respond with "What is the capital of Spain?" because it thinks it is completing a geography quiz list.',
            keyTakeaways: [
              'LLMs are autoregressive next-token predictors scaled to billions of parameters.',
              'Pre-training builds the knowledge base; post-training (SFT and RLHF) shapes behavior and alignment.',
              'They possess vast statistical knowledge but lack an active internal world-model or real-time consciousness.'
            ],
            applyIt: {
              prompt: 'Explain the difference between a raw base model and an instruction-tuned model to a non-technical colleague.',
              actionSteps: [
                'Define base model as a pure text completer.',
                'Define instruction-tuned model as an assistant trained to follow user directives.',
                'Give an example prompt showing how both would respond differently.'
              ],
              reflectionQuestion: 'Why is post-training alignment critical for commercial enterprise deployments?'
            },
            quiz: {
              id: 'quiz-llm',
              lessonId: 'lesson-what-is-llm',
              title: 'Knowledge Check: LLM Fundamentals',
              questions: [
                {
                  id: 'q1',
                  questionText: 'What is the primary objective of a language model during the pre-training phase?',
                  type: 'multiple_choice',
                  options: [
                    { id: 'opt1', text: 'To predict the next token in a sequence given preceding tokens.' },
                    { id: 'opt2', text: 'To memorize all phone numbers on the internet.' },
                    { id: 'opt3', text: 'To prove mathematical theorems exclusively.' },
                    { id: 'opt4', text: 'To generate audio waveforms directly.' }
                  ],
                  correctOptionId: 'opt1',
                  explanation: 'Pre-training is self-supervised autoregressive next-token prediction across massive corpora.'
                },
                {
                  id: 'q2',
                  questionText: 'What technique is used during post-training to align model behavior with human preferences for helpfulness and safety?',
                  type: 'multiple_choice',
                  options: [
                    { id: 'opt1', text: 'Hard drive formatting' },
                    { id: 'opt2', text: 'Reinforcement Learning from Human Feedback (RLHF) and Direct Preference Optimization (DPO)' },
                    { id: 'opt3', text: 'HTML compilation' },
                    { id: 'opt4', text: 'Unsupervised clustering' }
                  ],
                  correctOptionId: 'opt2',
                  explanation: 'RLHF and DPO reward desirable behaviors (helpfulness, truthfulness, safety) and penalize harmful or nonsensical responses.'
                }
              ]
            },
            nextLessonId: 'lesson-how-tokens-work'
          },
          {
            id: 'lesson-how-tokens-work',
            slug: 'how-tokens-work',
            moduleId: 'mod-2-1',
            pathId: 'path-2',
            title: 'How Tokens Work',
            tagline: 'The atomic currency of language models and why tokenization matters.',
            difficulty: 'Beginner',
            category: 'ChatGPT & LLMs',
            estimatedMinutes: 7,
            orderIndex: 2,
            status: 'published',
            bigIdea: 'LLMs do not read letters or whole words; they process text as numerical tokens representing character chunks (typically ~0.75 words per token in English).',
            whyItMatters: 'Token limits determine API pricing, memory constraints, context capacity, and why models occasionally struggle with simple character-level tasks like spelling or rhyming.',
            simpleExplanation: 'When you read "understanding", your brain recognizes the concept. An LLM breaks the word into chunks: "under" (Token #4321) and "standing" (Token #9812). Because it sees numbers rather than individual letters, asking it "How many letter r\'s are in strawberry?" requires it to deduce spelling from token IDs rather than looking at letters directly.',
            realWorldExample: {
              scenario: 'Pricing calculation for an enterprise AI document processing app.',
              impact: 'A 100-page PDF containing 40,000 words converts to approximately 53,000 tokens, which directly dictates your inference cost and latency.',
            },
            keyIdeas: [
              { title: 'Sub-Word Tokenization', summary: 'Common algorithms like Byte-Pair Encoding (BPE) split frequent words into single tokens and rare words into sub-word pieces.' },
              { title: 'Tokens as Numerical IDs', summary: 'Every token maps to an integer in the model’s fixed vocabulary (e.g. 32,000 to 256,000 token dictionary).' },
              { title: 'Token-to-Cost Ratio', summary: '1,000 English words is roughly equal to 1,333 tokens. Non-English languages with complex scripts often require more tokens per word.' }
            ],
            visualExplanation: {
              type: 'cards',
              title: 'Tokenization Breakdown Example',
              content: 'See how a standard sentence is sliced into tokens by modern tokenizers.',
              items: [
                { label: '"AI Atlas"', detail: 'Token 1: [ AI] (ID: 15496), Token 2: [ Atlas] (ID: 38921)' },
                { label: '"unbelievable"', detail: 'Token 1: [un], Token 2: [believ], Token 3: [able]' },
                { label: 'Whitespace & Punctuation', detail: 'Spaces before words are typically attached directly to the following token.' }
              ]
            },
            goDeeper: 'Because tokenizers group common sequences together, arithmetic can be tricky. "384" + "512" might be encoded as single token IDs rather than individual digits, forcing the model to learn mathematical carry rules in token-space rather than digit-by-digit.',
            keyTakeaways: [
              'Tokens are the fundamental unit of input and output for LLMs.',
              '1 token ≈ 4 characters or 0.75 words in English.',
              'Understanding tokenization clarifies why models bill per token and why character-counting tasks can be challenging.'
            ],
            applyIt: {
              prompt: 'Estimate the token count for a 500-word blog post and calculate the cost at $2.50 per million input tokens.',
              actionSteps: [
                'Word count: 500 words.',
                'Estimated tokens: 500 / 0.75 ≈ 667 tokens.',
                'Cost: 667 * ($2.50 / 1,000,000) = $0.001667 (less than one-fifth of a penny).'
              ],
              reflectionQuestion: 'Why does optimizing prompt length save significant money at scale?'
            },
            quiz: {
              id: 'quiz-tokens',
              lessonId: 'lesson-how-tokens-work',
              title: 'Knowledge Check: Tokens',
              questions: [
                {
                  id: 'q1',
                  questionText: 'On average in English, approximately how many tokens are in 750 words?',
                  type: 'multiple_choice',
                  options: [
                    { id: 'opt1', text: '75 tokens' },
                    { id: 'opt2', text: 'Approximately 1,000 tokens' },
                    { id: 'opt3', text: '50,000 tokens' },
                    { id: 'opt4', text: 'Exactly 750 tokens always' }
                  ],
                  correctOptionId: 'opt2',
                  explanation: 'Since 1 token is roughly 0.75 words, 750 words / 0.75 = 1,000 tokens.'
                },
                {
                  id: 'q2',
                  questionText: 'Why do LLMs sometimes struggle with questions like "How many letters in the word \'lollipop\'?"',
                  type: 'multiple_choice',
                  options: [
                    { id: 'opt1', text: 'They don\'t understand English.' },
                    { id: 'opt2', text: 'They process words as whole sub-word token chunks rather than individual character sequences.' },
                    { id: 'opt3', text: 'The question is too difficult for any computer.' },
                    { id: 'opt4', text: 'Their memory is cleared after every letter.' }
                  ],
                  correctOptionId: 'opt2',
                  explanation: 'Because words are ingested as token IDs rather than arrays of individual characters, the model must deduce individual letter counts indirectly.'
                }
              ]
            },
            nextLessonId: 'lesson-context-windows'
          },
          {
            id: 'lesson-context-windows',
            slug: 'context-windows',
            moduleId: 'mod-2-1',
            pathId: 'path-2',
            title: 'Context Windows & Working Memory',
            tagline: 'How much an AI can hold in its active memory at once.',
            difficulty: 'Intermediate',
            category: 'ChatGPT & LLMs',
            estimatedMinutes: 7,
            orderIndex: 3,
            status: 'published',
            bigIdea: 'The context window is the total budget of tokens (input prompt + previous conversation + output) an AI can process in a single interaction.',
            whyItMatters: 'Context windows have expanded from 2,048 tokens in 2020 to over 1,000,000+ tokens today, enabling models to analyze entire codebases, books, and financial reports in one prompt.',
            simpleExplanation: 'Imagine an AI as a desk with a limited surface area. Anything placed on the desk (your prompt, uploaded files, and chat history) can be read instantly. If a document is too large to fit on the desk, older parts fall off the edge and are completely forgotten for that response.',
            realWorldExample: {
              scenario: 'Auditing a 300-page quarterly financial report with footnotes.',
              impact: 'A 1M-token context window allows you to upload the entire document at once and ask: "Cross-reference page 42 revenue projections against the regulatory risk notes on page 280."',
            },
            keyIdeas: [
              { title: 'Prompt + Output Budget', summary: 'Context size must accommodate both your input prompt and the generated response.' },
              { title: 'The "Lost in the Middle" Phenomenon', summary: 'Models often attend most reliably to information at the very beginning and very end of long contexts.' },
              { title: 'Attention Complexity', summary: 'Standard self-attention scales quadratically with sequence length (O(N²)), requiring architectural innovations like FlashAttention to scale to millions of tokens.' }
            ],
            visualExplanation: {
              type: 'comparison',
              title: 'Evolution of Context Windows',
              content: 'How working memory capacity has expanded over generations.',
              items: [
                { label: 'GPT-3 (2020)', detail: '2,048 tokens (~3 pages of text)' },
                { label: 'GPT-4 (2023)', detail: '8k – 128k tokens (~100 to 300 pages)' },
                { label: 'Gemini 1.5 / 2.0 (2024–2025)', detail: '1,000,000 – 2,000,000+ tokens (hours of video, entire libraries)' }
              ]
            },
            goDeeper: 'Even with million-token windows, needle-in-a-haystack retrieval benchmark tests evaluate whether a model can reliably find a single isolated fact hidden deep inside hundreds of thousands of irrelevant tokens.',
            keyTakeaways: [
              'The context window defines the operational working memory for a single inference call.',
              'Long context enables direct document, video, and codebase analysis without complex chunking.',
              'Critical instructions should ideally be positioned near the start or end of massive prompts for maximum recall.'
            ],
            applyIt: {
              prompt: 'Design a prompt structure for summarizing a 50-page legal contract using long context best practices.',
              actionSteps: [
                'Place system instructions and evaluation criteria at the top.',
                'Insert the full 50-page contract text in the middle.',
                'Reiterate the specific required output schema and key questions at the bottom.'
              ],
              reflectionQuestion: 'Why does placing the question at the very end improve reasoning accuracy in long contexts?'
            },
            quiz: {
              id: 'quiz-context',
              lessonId: 'lesson-context-windows',
              title: 'Knowledge Check: Context Windows',
              questions: [
                {
                  id: 'q1',
                  questionText: 'What happens when a chat conversation exceeds a model\'s maximum context window limit?',
                  type: 'multiple_choice',
                  options: [
                    { id: 'opt1', text: 'The computer catches fire.' },
                    { id: 'opt2', text: 'Older conversation tokens must be truncated or summarized, or the request fails.' },
                    { id: 'opt3', text: 'The model permanently learns the conversation in its weights.' },
                    { id: 'opt4', text: 'The internet connection drops.' }
                  ],
                  correctOptionId: 'opt2',
                  explanation: 'When context limits are reached, the system must drop older tokens or summarize history to fit within the memory budget.'
                }
              ]
            },
            nextLessonId: 'lesson-transformer-architecture'
          },
          {
            id: 'lesson-transformer-architecture',
            slug: 'what-is-a-transformer',
            moduleId: 'mod-2-1',
            pathId: 'path-2',
            title: 'Transformers & The Attention Mechanism',
            tagline: 'The breakthrough paper "Attention Is All You Need" that sparked the modern AI boom.',
            difficulty: 'Intermediate',
            category: 'AI Engineering',
            estimatedMinutes: 9,
            orderIndex: 4,
            status: 'published',
            bigIdea: 'Transformers revolutionized AI by replacing sequential word-by-word processing with self-attention, allowing models to process all words in parallel and understand context across long distances.',
            whyItMatters: 'Almost every modern generative AI breakthrough—from ChatGPT to Gemini, Claude, Midjourney, and AlphaFold—is built on the Transformer architecture.',
            simpleExplanation: 'Older AI models read text word by word like someone reading through a narrow straw: by the time they reached word 50, they had forgotten word 1. A Transformer looks at the entire page at once, drawing invisible dynamic threads between words that relate to each other (e.g. connecting the pronoun "it" to the noun "bank" 20 words earlier).',
            realWorldExample: {
              scenario: 'Translating ambiguous sentences like "The bank was muddy" vs "The bank approved the loan".',
              impact: 'The self-attention mechanism checks surrounding words ("muddy" vs "loan") to determine whether "bank" refers to a river edge or a financial institution before translating.',
            },
            keyIdeas: [
              { title: 'Self-Attention Mechanism', summary: 'Calculates how much attention each word should pay to every other word in the sequence (Query, Key, Value matrices).' },
              { title: 'Massive Parallelization', summary: 'Because words are processed simultaneously rather than sequentially, models could be trained across thousands of GPUs at unprecedented scale.' },
              { title: 'Positional Encodings', summary: 'Since processing is parallel, explicit mathematical coordinates are injected so the model knows word order.' }
            ],
            visualExplanation: {
              type: 'architecture',
              title: 'Self-Attention Calculation Matrix',
              content: 'Query (Q), Key (K), and Value (V) mechanics.',
              items: [
                { label: 'Query (Q)', detail: '"What am I looking for in the rest of this sentence?"' },
                { label: 'Key (K)', detail: '"What information do I offer to other words?"' },
                { label: 'Attention Score', detail: 'Softmax(Q · Kᵀ / √d) determines weight placed on Value (V)' }
              ]
            },
            goDeeper: 'Introduced by Vaswani et al. at Google in the landmark 2017 paper "Attention Is All You Need", the architecture originally used an Encoder-Decoder structure for translation. Today, most modern LLMs (like GPT and LLaMA) use Decoder-only autoregressive architectures.',
            keyTakeaways: [
              'Transformers eliminated sequential processing bottlenecks via parallel self-attention.',
              'Attention dynamically weights semantic relationships between all tokens in a prompt.',
              'The architecture enabled scaling laws where more compute and data reliably yield higher intelligence.'
            ],
            applyIt: {
              prompt: 'Trace how self-attention resolves the pronoun in: "The trophy didn’t fit into the brown suitcase because it was too large."',
              actionSteps: [
                'Identify the ambiguous word: "it".',
                'Examine the candidate antecedents: "trophy" vs "suitcase".',
                'Notice how "too large" directs attention strongly to "trophy".'
              ],
              reflectionQuestion: 'What would "it" refer to if the sentence ended with "because it was too small"?'
            },
            quiz: {
              id: 'quiz-transformers',
              lessonId: 'lesson-transformer-architecture',
              title: 'Knowledge Check: Transformers',
              questions: [
                {
                  id: 'q1',
                  questionText: 'What key innovation made Transformers radically faster to train than previous recurrent neural networks (RNNs)?',
                  type: 'multiple_choice',
                  options: [
                    { id: 'opt1', text: 'They completely removed all mathematical equations.' },
                    { id: 'opt2', text: 'They process all tokens in parallel rather than sequentially word-by-word.' },
                    { id: 'opt3', text: 'They only work on English text.' },
                    { id: 'opt4', text: 'They use zero GPU memory.' }
                  ],
                  correctOptionId: 'opt2',
                  explanation: 'Parallel token processing enabled massive GPU scaling compared to sequential RNNs.'
                }
              ]
            },
            sources: [
              { title: 'Attention Is All You Need', author: 'Vaswani et al. (Google Brain & Google Research)', type: 'paper' }
            ],
            nextLessonId: 'lesson-prompt-engineering-core'
          }
        ]
      }
    ]
  },
  {
    id: 'path-3',
    slug: 'prompt-engineering',
    title: 'Prompt Engineering & Steering',
    tagline: 'Master the art and science of extracting precise, reliable outputs from foundation models.',
    description: 'Learn system prompting, few-shot conditioning, Chain-of-Thought reasoning, and defensive prompting against hallucinations.',
    difficulty: 'Intermediate',
    category: 'Prompt Engineering',
    estimatedHours: 2.0,
    totalLessons: 3,
    icon: 'Terminal',
    featured: true,
    orderIndex: 3,
    status: 'published',
    modules: [
      {
        id: 'mod-3-1',
        pathId: 'path-3',
        title: 'Core Prompt Techniques',
        description: 'From naive questions to enterprise-grade prompting strategies.',
        orderIndex: 1,
        lessons: [
          {
            id: 'lesson-prompt-engineering-core',
            slug: 'core-prompt-engineering',
            moduleId: 'mod-3-1',
            pathId: 'path-3',
            title: 'Foundations of Prompt Engineering',
            tagline: 'The 5 elements of high-performing, deterministic prompts.',
            difficulty: 'Beginner',
            category: 'Prompt Engineering',
            estimatedMinutes: 7,
            orderIndex: 1,
            status: 'published',
            bigIdea: 'Prompt engineering is not guesswork; it is the structured engineering discipline of providing clear roles, context, task constraints, examples, and output schemas to guide model probability distributions.',
            whyItMatters: 'A vague prompt produces generic, mediocre outputs. A well-engineered prompt can turn an average model into an expert domain analyst, coder, or writer.',
            simpleExplanation: 'If you ask a world-class chef "Make me food," you might get oatmeal when you wanted steak. But if you specify: "You are an Italian chef (Role). Cook a gluten-free dinner for two with mushrooms in under 20 minutes (Constraints). Provide the recipe formatted in bullet points with exact gram measurements (Schema)," you get exactly what you need.',
            realWorldExample: {
              scenario: 'Extracting structured customer feedback into a database.',
              impact: 'Instead of free-form text, a prompt with a JSON schema constraint extracts `{ sentiment: "negative", category: "billing", urgencyScore: 8 }` reliably every time.',
            },
            keyIdeas: [
              { title: 'The 5 Core Elements', summary: 'Role/Persona + Context + Specific Task + Constraints + Output Schema.' },
              { title: 'Few-Shot Exemplars', summary: 'Providing 2–3 input/output examples dramatically improves pattern adherence over zero-shot instructions alone.' },
              { title: 'Negative Constraints', summary: 'Explicitly stating what NOT to do (e.g. "Do not include introductory pleasantries") prevents filler text.' }
            ],
            visualExplanation: {
              type: 'cards',
              title: 'The Anatomy of a Production Prompt',
              content: 'Key components of a robust enterprise prompt structure.',
              items: [
                { label: 'System Persona', detail: '"You are a Senior Security Engineer reviewing API designs."' },
                { label: 'Context & Inputs', detail: '"Here is the Swagger definition and threat model."' },
                { label: 'Task & Format', detail: '"List the top 3 vulnerabilities in valid JSON with severity tags."' }
              ]
            },
            goDeeper: 'Chain-of-Thought (CoT) prompting ("Think step by step before answering") encourages the model to generate intermediate reasoning tokens, giving the attention mechanism time to compute complex logical steps before committing to a final answer.',
            keyTakeaways: [
              'Vague inputs guarantee vague, generic outputs.',
              'Few-shot examples are the single highest-ROI technique for formatting consistency.',
              'Enforce explicit output schemas (JSON/Markdown) for programmatic integration.'
            ],
            applyIt: {
              prompt: 'Rewrite the lazy prompt: "Summarize this article" into a production-grade prompt.',
              actionSteps: [
                'Add Persona: "You are an executive chief of staff."',
                'Add Constraints: "Summary must be exactly 3 bullet points, under 50 words each."',
                'Add Schema: "Format with bold takeaways followed by 1 actionable next step."'
              ],
              reflectionQuestion: 'Why does forcing step-by-step thinking reduce mathematical errors in LLMs?'
            },
            quiz: {
              id: 'quiz-prompting',
              lessonId: 'lesson-prompt-engineering-core',
              title: 'Knowledge Check: Prompt Engineering',
              questions: [
                {
                  id: 'q1',
                  questionText: 'What is "Few-Shot Prompting"?',
                  type: 'multiple_choice',
                  options: [
                    { id: 'opt1', text: 'Typing the prompt very quickly with few keystrokes.' },
                    { id: 'opt2', text: 'Providing a few clear input-and-output example demonstrations directly in the prompt.' },
                    { id: 'opt3', text: 'Prompting the model only three times per day.' },
                    { id: 'opt4', text: 'Training the model weights from scratch.' }
                  ],
                  correctOptionId: 'opt2',
                  explanation: 'Few-shot prompting provides concrete input/output examples within the prompt to steer formatting and style.'
                }
              ]
            },
            nextLessonId: 'lesson-ai-hallucinations'
          },
          {
            id: 'lesson-ai-hallucinations',
            slug: 'ai-hallucinations',
            moduleId: 'mod-3-1',
            pathId: 'path-3',
            title: 'AI Hallucinations & Grounding',
            tagline: 'Why models make things up with high confidence and how to stop them.',
            difficulty: 'Beginner',
            category: 'Generative AI',
            estimatedMinutes: 6,
            orderIndex: 2,
            status: 'published',
            bigIdea: 'Hallucinations occur because language models are optimized for linguistic plausibility rather than ground truth; grounding techniques tether generation to verified sources.',
            whyItMatters: 'In legal, healthcare, and enterprise software, a confident hallucination can result in severe compliance breaches and financial damage.',
            simpleExplanation: 'An LLM is like a master storyteller who loves to please you. If you ask it about a fictional historical event, it will invent plausible dates, names, and battles because its objective is to provide a fluent, grammatically convincing story, not to look up a physical encyclopedia.',
            realWorldExample: {
              scenario: 'A lawyer submitting a court brief with AI-generated legal citations.',
              impact: 'The AI invented fake case names with realistic docket numbers (e.g. Varghese v. China Southern Airlines), leading to judicial sanctions for the attorney.',
            },
            keyIdeas: [
              { title: 'Fluent Plausibility vs Factuality', summary: 'An LLM measures how likely words belong together, not whether a real-world fact exists.' },
              { title: 'Grounding via Reference Text', summary: 'Instructing the model: "Answer ONLY using facts present in the provided text below. If unsure, state \'Not found\'."' },
              { title: 'Temperature & Sampling', summary: 'Lower temperature (e.g. 0.0) reduces creative variance and increases adherence to direct facts.' }
            ],
            visualExplanation: {
              type: 'comparison',
              title: 'Ungrounded vs Grounded Inference',
              content: 'How grounding constraints prevent speculative hallucinations.',
              items: [
                { label: 'Ungrounded LLM', detail: 'Prompt: "What is our company refund policy?" -> Relies on generic memory -> May guess 30 days.' },
                { label: 'Grounded (RAG)', detail: 'Prompt: [Doc: Refund is 14 days] + "Answer strictly from doc" -> Output: "14 days."' }
              ]
            },
            goDeeper: 'Hallucinations can be categorized into Extrinsic Hallucinations (adding unverifiable claims not supported by source text) and Intrinsic Hallucinations (directly contradicting the provided source text).',
            keyTakeaways: [
              'LLMs generate probable text, not guaranteed truth.',
              'Always provide authoritative source context for mission-critical facts.',
              'Explicitly give the model permission to say "I do not know" or "Information not in text".'
            ],
            applyIt: {
              prompt: 'Add an anti-hallucination guardrail instruction to a customer support bot prompt.',
              actionSteps: [
                'Add constraint: "You must only answer questions based strictly on the provided knowledge base snippets."',
                'Add fallback rule: "If the snippet does not contain the answer, reply: \'I cannot find that in our policy, please contact human support.\'"',
                'Add verification: "Do not extrapolate or assume unstated terms."'
              ],
              reflectionQuestion: 'Why does setting temperature to 0.0 help with factual extraction tasks?'
            },
            quiz: {
              id: 'quiz-hallucinations',
              lessonId: 'lesson-ai-hallucinations',
              title: 'Knowledge Check: Hallucinations',
              questions: [
                {
                  id: 'q1',
                  questionText: 'What is the root cause of AI hallucinations in Large Language Models?',
                  type: 'multiple_choice',
                  options: [
                    { id: 'opt1', text: 'Computer viruses on the server.' },
                    { id: 'opt2', text: 'Models are statistical token predictors optimized for plausible text continuation rather than verified truth verification.' },
                    { id: 'opt3', text: 'Users asking questions in lower-case letters.' },
                    { id: 'opt4', text: 'Overheating graphic cards.' }
                  ],
                  correctOptionId: 'opt2',
                  explanation: 'Models calculate the highest probability next tokens based on training text, which can generate confident but fictitious statements.'
                }
              ]
            },
            nextLessonId: 'lesson-what-is-rag'
          },
          {
            id: 'lesson-what-is-rag',
            slug: 'what-is-rag',
            moduleId: 'mod-3-1',
            pathId: 'path-3',
            title: 'What Is Retrieval-Augmented Generation (RAG)?',
            tagline: 'Connecting LLMs to your private data without retraining the model.',
            difficulty: 'Intermediate',
            category: 'Building AI Applications',
            estimatedMinutes: 8,
            orderIndex: 3,
            status: 'published',
            bigIdea: 'RAG is an architecture that fetches relevant documents from a database when a question is asked, then feeds those documents into the LLM\'s prompt as trusted reference material.',
            whyItMatters: 'RAG is the primary architecture used by enterprises today to build chatbots over private Notion docs, Jira tickets, code repositories, and PDFs.',
            simpleExplanation: 'Imagine taking an open-book exam. A standalone LLM is a student taking a closed-book exam relying only on memory (which might be outdated or fuzzy). RAG is handing the student the exact textbook open to the exact page containing the answer before they write down the solution.',
            realWorldExample: {
              scenario: 'An internal HR assistant answering: "What is our company parental leave policy for 2026?"',
              impact: 'The RAG system searches the employee handbook, pulls paragraph 4.2, and instructs the LLM to summarize it accurately for the employee.',
            },
            keyIdeas: [
              { title: 'The 3-Step RAG Loop', summary: '1. Ingest & Embed data -> 2. Retrieve relevant chunks on query -> 3. Generate answer grounded in chunks.' },
              { title: 'Private & Real-Time Data', summary: 'Allows models to access proprietary internal knowledge and real-time news without expensive model fine-tuning.' },
              { title: 'Source Attribution', summary: 'Enables direct citations (e.g. "Source: Handbook Page 12") for complete transparency and auditability.' }
            ],
            visualExplanation: {
              type: 'flow',
              title: 'The End-to-End RAG Architecture',
              content: 'How a user query traverses retrieval and generation pipelines.',
              items: [
                { label: '1. User Query', detail: '"How do I configure SSO in AI Atlas?"' },
                { label: '2. Vector Search', detail: 'Converts query to embedding -> finds top 3 matching documentation chunks' },
                { label: '3. Augmented Prompt', detail: '[Context: SSO docs] + "Answer the user question based on context"' },
                { label: '4. Grounded Output', detail: 'Accurate step-by-step SSO setup instructions with citation links' }
              ]
            },
            goDeeper: 'Advanced RAG architectures use techniques like Hybrid Search (combining BM25 keyword search with dense vector embeddings), Query Rewriting, and Re-Ranking models (like Cohere Rerank) to maximize retrieval precision.',
            keyTakeaways: [
              'RAG turns closed-book LLM generation into open-book factual synthesis.',
              'It bypasses the high cost and latency of fine-tuning model weights.',
              'Data freshness and privacy are preserved because only relevant snippets are injected at runtime.'
            ],
            applyIt: {
              prompt: 'Map out the RAG architecture for a customer support knowledge base.',
              actionSteps: [
                'Step 1: Chunk support articles into 300-word segments.',
                'Step 2: Generate vector embeddings for each chunk and save to Vector DB.',
                'Step 3: When customer chats, embed question -> retrieve top 3 articles -> feed to Gemini API.'
              ],
              reflectionQuestion: 'Why is RAG often preferred over fine-tuning for constantly changing company policies?'
            },
            quiz: {
              id: 'quiz-rag',
              lessonId: 'lesson-what-is-rag',
              title: 'Knowledge Check: RAG',
              questions: [
                {
                  id: 'q1',
                  questionText: 'What is the primary purpose of Retrieval-Augmented Generation (RAG)?',
                  type: 'multiple_choice',
                  options: [
                    { id: 'opt1', text: 'To train a new foundation model from scratch.' },
                    { id: 'opt2', text: 'To retrieve relevant factual documents from a database and inject them into the LLM context prompt at query time.' },
                    { id: 'opt3', text: 'To speed up the computer\'s graphics card.' },
                    { id: 'opt4', text: 'To compress images into smaller files.' }
                  ],
                  correctOptionId: 'opt2',
                  explanation: 'RAG dynamically retrieves external knowledge chunks and injects them into the prompt to ground the LLM in verified facts.'
                }
              ]
            },
            nextLessonId: 'lesson-vector-embeddings'
          }
        ]
      }
    ]
  },
  {
    id: 'path-4',
    slug: 'building-ai-applications',
    title: 'Building AI Applications',
    tagline: 'From embeddings and vector databases to production RAG systems.',
    description: 'Learn the core engineering stack: Embeddings, Vector Stores, Chunking Strategies, and Semantic Search.',
    difficulty: 'Intermediate',
    category: 'Building AI Applications',
    estimatedHours: 3.0,
    totalLessons: 3,
    icon: 'Cpu',
    featured: true,
    orderIndex: 4,
    status: 'published',
    modules: [
      {
        id: 'mod-4-1',
        pathId: 'path-4',
        title: 'Vector Infrastructure',
        description: 'The mathematics and data structures of semantic search.',
        orderIndex: 1,
        lessons: [
          {
            id: 'lesson-vector-embeddings',
            slug: 'what-are-embeddings',
            moduleId: 'mod-4-1',
            pathId: 'path-4',
            title: 'Vector Embeddings Explained',
            tagline: 'How text and concepts are converted into geometric coordinates in meaning-space.',
            difficulty: 'Intermediate',
            category: 'Building AI Applications',
            estimatedMinutes: 8,
            orderIndex: 1,
            status: 'published',
            bigIdea: 'An embedding is a long list of floating-point numbers (e.g. 768 to 1536 dimensions) that represents the semantic meaning of a piece of text as a point in high-dimensional space.',
            whyItMatters: 'Embeddings allow computers to search by meaning rather than exact keywords. "Puppy" and "Canine baby" will land close together in embedding space even though they share zero letters.',
            simpleExplanation: 'Imagine mapping animals on a 2D graph with "Size" on the X-axis and "Fluffiness" on the Y-axis. Dogs and cats cluster near each other, while alligators land far away. An embedding model does this same thing, but in 1,536 dimensions across thousands of nuanced conceptual attributes.',
            realWorldExample: {
              scenario: 'Searching an e-commerce catalog for "warm winter coat".',
              impact: 'Vector search matches items labeled "down jacket", "thermal parka", and "snow anorak" even if the title never mentions the exact word "coat".',
            },
            keyIdeas: [
              { title: 'Semantic Proximity', summary: 'Concepts with similar meanings have smaller geometric distance (measured via Cosine Similarity or Dot Product).' },
              { title: 'Embedding Models', summary: 'Specialized models (like text-embedding-004) that output static vector arrays rather than generating conversational text.' },
              { title: 'Multimodal Vectors', summary: 'Modern embedding spaces can project text, images, and audio into the same shared coordinate space.' }
            ],
            visualExplanation: {
              type: 'comparison',
              title: 'Keyword Search vs Semantic Vector Search',
              content: 'Understanding why semantic embeddings outperform basic SQL string matching.',
              items: [
                { label: 'Keyword Search (LIKE %...%)', detail: 'Query: "automobile repairs" -> Misses: "car maintenance", "fix vehicle"' },
                { label: 'Vector Semantic Search', detail: 'Query: "automobile repairs" -> Matches: "car maintenance" (Cosine Similarity: 0.94)' }
              ]
            },
            goDeeper: 'Cosine similarity measures the cosine of the angle between two vectors: Cosine(A, B) = (A · B) / (||A|| ||B||). A score of 1.0 indicates identical directional meaning, while 0.0 indicates orthogonal/unrelated concepts.',
            keyTakeaways: [
              'Embeddings translate human meaning into mathematical vector coordinates.',
              'Semantic similarity equals geometric closeness in vector space.',
              'They form the indexing engine for modern search, recommendations, and RAG systems.'
            ],
            applyIt: {
              prompt: 'Explain why vector embeddings solve the "vocabulary mismatch" problem in enterprise search.',
              actionSteps: [
                'Define vocabulary mismatch (users search with different words than authors write).',
                'Show how synonyms map to adjacent coordinates in vector space.',
                'Contrast with traditional keyword search index failures.'
              ],
              reflectionQuestion: 'Why is cosine similarity preferred over Euclidean distance for normalized embedding vectors?'
            },
            quiz: {
              id: 'quiz-embeddings',
              lessonId: 'lesson-vector-embeddings',
              title: 'Knowledge Check: Embeddings',
              questions: [
                {
                  id: 'q1',
                  questionText: 'What does it mean if two sentences have a high cosine similarity score (e.g. 0.92)?',
                  type: 'multiple_choice',
                  options: [
                    { id: 'opt1', text: 'They have the exact same number of letters.' },
                    { id: 'opt2', text: 'They share closely related semantic meaning in high-dimensional vector space.' },
                    { id: 'opt3', text: 'They were both written by the same author.' },
                    { id: 'opt4', text: 'They have spelling mistakes.' }
                  ],
                  correctOptionId: 'opt2',
                  explanation: 'High cosine similarity signifies that the vectors point in nearly the same direction in semantic meaning space.'
                }
              ]
            },
            nextLessonId: 'lesson-vector-databases'
          },
          {
            id: 'lesson-vector-databases',
            slug: 'what-is-a-vector-database',
            moduleId: 'mod-4-1',
            pathId: 'path-4',
            title: 'What Is a Vector Database?',
            tagline: 'Indexing millions of high-dimensional vectors for millisecond retrieval.',
            difficulty: 'Intermediate',
            category: 'Building AI Applications',
            estimatedMinutes: 8,
            orderIndex: 2,
            status: 'published',
            bigIdea: 'A vector database is specialized database software optimized to store, index, and query billions of high-dimensional vectors in single-digit milliseconds.',
            whyItMatters: 'Comparing a query vector against millions of document vectors one by one is too slow. Vector databases use Approximate Nearest Neighbor (ANN) indexing algorithms to make instant similarity search possible at global scale.',
            simpleExplanation: 'Imagine walking into a massive library with 10 million unsorted books. If you have to check every single book cover, finding a match takes hours. A vector database is like a master librarian who has organized the entire building into multidimensional topic clusters so you can walk straight to the exact shelf in 2 seconds.',
            realWorldExample: {
              scenario: 'Spotify\'s recommendation system finding songs similar to your taste.',
              impact: 'Spotify indexes acoustic audio embeddings in a vector database to retrieve 20 recommended tracks out of a 100-million song catalog in under 20 milliseconds.',
            },
            keyIdeas: [
              { title: 'Approximate Nearest Neighbor (ANN)', summary: 'Algorithms like HNSW (Hierarchical Navigable Small World) trade a tiny fraction of accuracy for orders-of-magnitude faster search speed.' },
              { title: 'Metadata Filtering', summary: 'The ability to combine vector similarity with relational filters (e.g. "Find articles similar to X created after 2025 where category = \'finance\'").' },
              { title: 'Hybrid Search', summary: 'Merging dense vector search with sparse BM25 keyword matching for optimal recall.' }
            ],
            visualExplanation: {
              type: 'flow',
              title: 'Vector Database Ingestion & Search Lifecycle',
              content: 'How raw data is indexed and queried in production vector stores.',
              items: [
                { label: 'Ingestion Pipeline', detail: 'Document -> Chunking -> Embeddings API -> Vector DB with HNSW Index' },
                { label: 'Query Pipeline', detail: 'User Question -> Query Embedding -> ANN Index Lookup -> Top-K Nearest Chunks' }
              ]
            },
            goDeeper: 'Leading vector database technologies include purpose-built vector stores (Pinecone, Qdrant, Milvus, Weaviate, Chroma) and vector extensions on relational databases (PostgreSQL pgvector).',
            keyTakeaways: [
              'Vector databases power real-time similarity search across millions of documents.',
              'HNSW and IVFFlat algorithms enable sub-50ms Approximate Nearest Neighbor retrieval.',
              'Metadata filtering is essential for tenant isolation and enterprise security.'
            ],
            applyIt: {
              prompt: 'Evaluate whether to use PostgreSQL with pgvector vs a dedicated vector database (like Pinecone/Qdrant) for a new project.',
              actionSteps: [
                'For < 1M vectors with existing relational data: PostgreSQL pgvector simplifies architecture.',
                'For > 10M vectors with high query throughput: Dedicated vector database provides specialized scaling.'
              ],
              reflectionQuestion: 'Why does HNSW build a multi-layered graph for fast vector traversal?'
            },
            quiz: {
              id: 'quiz-vectordb',
              lessonId: 'lesson-vector-databases',
              title: 'Knowledge Check: Vector Databases',
              questions: [
                {
                  id: 'q1',
                  questionText: 'Why do vector databases use Approximate Nearest Neighbor (ANN) indexing rather than brute-force exact comparison?',
                  type: 'multiple_choice',
                  options: [
                    { id: 'opt1', text: 'Brute-force exact comparison requires computing distances against every single record, which is too slow at scale.' },
                    { id: 'opt2', text: 'Exact comparison is illegal.' },
                    { id: 'opt3', text: 'ANN algorithms produce random guesses.' },
                    { id: 'opt4', text: 'Computers cannot do math.' }
                  ],
                  correctOptionId: 'opt1',
                  explanation: 'Brute force has O(N) linear complexity, which becomes unusable when searching millions of high-dimensional vectors in real time.'
                }
              ]
            },
            nextLessonId: 'lesson-ai-agents-intro'
          },
          {
            id: 'lesson-ai-agents-intro',
            slug: 'what-are-ai-agents',
            moduleId: 'mod-4-1',
            pathId: 'path-4',
            title: 'What Is an AI Agent?',
            tagline: 'Moving from one-shot text generation to autonomous multi-step reasoning loops.',
            difficulty: 'Intermediate',
            category: 'AI Agents',
            estimatedMinutes: 9,
            orderIndex: 3,
            status: 'published',
            bigIdea: 'An AI Agent is an LLM embedded in a continuous control loop that can reason, plan, use external tools, observe results, and iterate autonomously until a complex goal is accomplished.',
            whyItMatters: 'Traditional chatbots can only answer in text. AI Agents can book flights, resolve customer refunds in Stripe, debug GitHub pull requests, and orchestrate complex enterprise workflows without human intervention.',
            simpleExplanation: 'A standard LLM is like an encyclopedia: you ask a question, it answers once. An AI Agent is like a junior employee: you give it a goal ("Book the cheapest flight to Chicago under $300 next Friday"), and it opens the browser, searches options, checks your calendar, reads reviews, handles edge cases, and confirms the booking.',
            realWorldExample: {
              scenario: 'An autonomous software engineering agent (e.g. Devin or Claude Code).',
              impact: 'The agent reads a GitHub bug issue, runs unit tests, modifies source code files, verifies the fix by re-running tests, and opens a pull request automatically.',
            },
            keyIdeas: [
              { title: 'The ReAct Framework', summary: 'Reasoning + Acting: The model alternates between thinking ("I need to query the database"), acting (calling SQL tool), and observing output.' },
              { title: 'Tool Integration & Function Calling', summary: 'Connecting models to APIs, web search engines, calculators, and shell environments.' },
              { title: 'Memory & State Persistence', summary: 'Short-term context memory combined with long-term episodic vector storage for multi-turn execution.' }
            ],
            visualExplanation: {
              type: 'flow',
              title: 'The Autonomous Agentic Loop',
              content: 'The cyclical decision-making loop of an AI Agent.',
              items: [
                { label: '1. Goal & Planning', detail: 'Deconstruct high-level user objective into sequential steps' },
                { label: '2. Tool Execution', detail: 'Execute structured function call (e.g. weather API, database query)' },
                { label: '3. Observation', detail: 'Inspect tool return values and evaluate if step succeeded' },
                { label: '4. Synthesis / Termination', detail: 'Iterate until objective is complete, then return final answer' }
              ]
            },
            goDeeper: 'Agent architectures include single-agent ReAct loops, Plan-and-Solve patterns, and Multi-Agent Orchestrations (where specialized agent personas collaborate like a product manager, architect, and reviewer).',
            keyTakeaways: [
              'Agents combine LLM reasoning with external tool execution and iterative feedback loops.',
              'They shift AI from passive conversational Q&A to proactive goal execution.',
              'Safety rails, loop limits, and human-in-the-loop approvals are essential for production deployment.'
            ],
            applyIt: {
              prompt: 'Design the toolset required for an AI Agent tasked with managing customer support refund requests.',
              actionSteps: [
                'Tool 1: `fetch_user_order(user_id)` -> returns order details and dates.',
                'Tool 2: `check_refund_policy(order_id)` -> checks if within 30-day window.',
                'Tool 3: `issue_stripe_refund(order_id, amount)` -> executes transaction.'
              ],
              reflectionQuestion: 'Why is it critical to require human-in-the-loop confirmation before an agent executes irreversible actions (like deleting data or issuing large refunds)?'
            },
            quiz: {
              id: 'quiz-agents',
              lessonId: 'lesson-ai-agents-intro',
              title: 'Knowledge Check: AI Agents',
              questions: [
                {
                  id: 'q1',
                  questionText: 'What distinguishes an AI Agent from a traditional standalone LLM chat interface?',
                  type: 'multiple_choice',
                  options: [
                    { id: 'opt1', text: 'Agents run in a continuous loop capable of planning, invoking external tools, and iterating based on observation.' },
                    { id: 'opt2', text: 'Agents use human vocal cords.' },
                    { id: 'opt3', text: 'Agents only answer in rhymes.' },
                    { id: 'opt4', text: 'Agents cannot access the internet.' }
                  ],
                  correctOptionId: 'opt1',
                  explanation: 'Agents combine reasoning loops with tool execution (APIs, databases, code execution) to accomplish multi-step objectives autonomously.'
                }
              ]
            },
            nextLessonId: 'lesson-tool-calling-explained'
          }
        ]
      }
    ]
  },
  {
    id: 'path-5',
    slug: 'ai-agents-and-tools',
    title: 'AI Agents & Tool Calling',
    tagline: 'Build autonomous agents, function calling architectures, and multi-agent workflows.',
    description: 'Learn structured function calling, ReAct loops, agentic memory patterns, and error recovery.',
    difficulty: 'Advanced',
    category: 'AI Agents',
    estimatedHours: 3.0,
    totalLessons: 2,
    icon: 'Bot',
    orderIndex: 5,
    status: 'published',
    modules: [
      {
        id: 'mod-5-1',
        pathId: 'path-5',
        title: 'Agent Mechanics',
        description: 'Under the hood of tool calling and agentic orchestration.',
        orderIndex: 1,
        lessons: [
          {
            id: 'lesson-tool-calling-explained',
            slug: 'tool-calling-explained',
            moduleId: 'mod-5-1',
            pathId: 'path-5',
            title: 'Tool & Function Calling Mechanics',
            tagline: 'How foundation models output deterministic JSON to trigger external APIs.',
            difficulty: 'Intermediate',
            category: 'AI Agents',
            estimatedMinutes: 8,
            orderIndex: 1,
            status: 'published',
            bigIdea: 'Tool calling allows an LLM to recognize when it needs external information or actions, generate a structured JSON payload with exact function arguments, and wait for your backend to execute it.',
            whyItMatters: 'LLMs cannot execute code or access live databases by themselves. Tool calling provides the universal bridge between probabilistic language reasoning and deterministic API systems.',
            simpleExplanation: 'Think of the LLM as a brilliant consultant sitting in an office without a computer. If you ask for the current stock price of Apple, the consultant writes on a sticky note: "Run function `get_stock_price(ticker=\'AAPL\')`." You run the search, hand the consultant the note with "$235.50", and the consultant writes your final briefing.',
            realWorldExample: {
              scenario: 'A banking assistant checking your account balance and transferring money.',
              impact: 'The user prompts: "Send $50 to Sarah for dinner." The model emits `{ name: "transfer_money", args: { recipient: "Sarah", amount: 50.00, note: "dinner" } }`. The backend validates the parameters and executes the transaction safely.',
            },
            keyIdeas: [
              { title: 'Schema Definition via JSON Schema', summary: 'You supply the model with function declarations detailing function names, descriptions, and required argument types.' },
              { title: 'Deterministic Output Structure', summary: 'Modern models are fine-tuned to guarantee valid JSON syntax matching the schema specification.' },
              { title: 'Client-Executed Safety Barrier', summary: 'The model NEVER executes the code itself; it emits intent, and your backend controls validation and actual execution.' }
            ],
            visualExplanation: {
              type: 'flow',
              title: 'The Tool Calling Request-Response Lifecycle',
              content: 'Step-by-step protocol for function execution with foundation models.',
              items: [
                { label: '1. App -> LLM', detail: 'Prompt + Tool Declarations: `[ { name: "get_weather", parameters: { location: string } } ]`' },
                { label: '2. LLM -> App', detail: 'Function Call emitted: `{ name: "get_weather", args: { location: "London" } }`' },
                { label: '3. App -> API -> LLM', detail: 'App calls Weather API -> Sends result `{ temp: "18C", condition: "Sunny" }` back to model' },
                { label: '4. LLM -> App', detail: 'Final response generated: "It is currently 18°C and sunny in London today."' }
              ]
            },
            goDeeper: 'Parallel Tool Calling allows modern models to emit multiple function calls in a single turn (e.g. calling `get_weather("Paris")` and `get_weather("Tokyo")` simultaneously), drastically reducing network round-trip latency.',
            keyTakeaways: [
              'Tool calling bridges natural language instructions into validated API payloads.',
              'The LLM outputs structured function arguments; your server maintains full execution control.',
              'Precise docstrings and descriptive parameter annotations are critical for accurate tool selection.'
            ],
            applyIt: {
              prompt: 'Write a JSON schema for a tool that creates a calendar event.',
              actionSteps: [
                'Define properties: `title` (string), `startTime` (ISO string), `durationMinutes` (integer).',
                'Specify required fields: `title` and `startTime`.',
                'Add descriptive comments guiding the model on format conventions.'
              ],
              reflectionQuestion: 'Why does adding clear descriptions to parameter schemas prevent tool calling failures?'
            },
            quiz: {
              id: 'quiz-tool-calling',
              lessonId: 'lesson-tool-calling-explained',
              title: 'Knowledge Check: Tool Calling',
              questions: [
                {
                  id: 'q1',
                  questionText: 'Does the Large Language Model execute external APIs directly inside its own neural weights?',
                  type: 'multiple_choice',
                  options: [
                    { id: 'opt1', text: 'Yes, models have direct built-in internet sockets.' },
                    { id: 'opt2', text: 'No, the model generates structured arguments (JSON), and the host application executes the tool and passes results back.' },
                    { id: 'opt3', text: 'Yes, through quantum tunneling.' },
                    { id: 'opt4', text: 'Only when running on mobile devices.' }
                  ],
                  correctOptionId: 'opt2',
                  explanation: 'Models generate structured function calling payloads; execution safety and API calling is strictly controlled by the host application.'
                }
              ]
            },
            nextLessonId: 'lesson-finetuning-vs-rag'
          },
          {
            id: 'lesson-finetuning-vs-rag',
            slug: 'finetuning-vs-rag-vs-prompting',
            moduleId: 'mod-5-1',
            pathId: 'path-5',
            title: 'Fine-Tuning vs RAG vs Prompting',
            tagline: 'The definitive architectural decision matrix for enterprise AI applications.',
            difficulty: 'Advanced',
            category: 'AI Engineering',
            estimatedMinutes: 9,
            orderIndex: 2,
            status: 'published',
            bigIdea: 'Prompt Engineering adjusts instructions at runtime; RAG provides dynamic external knowledge; Fine-Tuning permanently alters model weights to adopt specialized style, vocabulary, or domain behavior.',
            whyItMatters: 'Choosing the wrong approach costs tens of thousands of dollars and months of engineering time. 90% of business problems can be solved with Prompting and RAG before ever touching Fine-Tuning.',
            simpleExplanation: 'Think of Prompting as whispering advice to a student before an exam. Think of RAG as giving the student an open textbook during the exam. Think of Fine-Tuning as putting the student through 6 months of medical school so the knowledge becomes second nature.',
            realWorldExample: {
              scenario: 'A company building an automated SQL query generator for its proprietary database schema.',
              impact: 'Starting with Few-Shot prompting yields 60% accuracy; adding RAG over table schemas reaches 85%; fine-tuning a small model on 5,000 internal SQL examples achieves 98% accuracy at 1/10th the inference cost.',
            },
            keyIdeas: [
              { title: 'The Hierarchy of Effort', summary: '1. Prompt Engineering (Hours) -> 2. RAG (Days/Weeks) -> 3. Fine-Tuning (Weeks/Months).' },
              { title: 'When to Fine-Tune', summary: 'Fine-tune for style, tone, structured output adherence, latency optimization, or learning a rare domain syntax (not for dynamic factual knowledge).' },
              { title: 'Parameter-Efficient Fine-Tuning (PEFT / LoRA)', summary: 'Techniques like Low-Rank Adaptation (LoRA) freeze 99% of model weights and train tiny adapter matrices, reducing GPU memory requirements by 80%.' }
            ],
            visualExplanation: {
              type: 'comparison',
              title: 'Comparison Matrix: Prompting vs RAG vs Fine-Tuning',
              content: 'Tradeoffs across knowledge dynamism, cost, and implementation complexity.',
              items: [
                { label: 'Prompt Engineering', detail: 'Best for: Quick prototypes, general tasks | Knowledge: Static | Cost: Low' },
                { label: 'RAG', detail: 'Best for: Dynamic data, proprietary knowledge, citations | Cost: Medium' },
                { label: 'Fine-Tuning', detail: 'Best for: Custom voice/style, latency reduction, specialized formats | Cost: High' }
              ]
            },
            goDeeper: 'Fine-tuning is susceptible to "Catastrophic Forgetting", where training a model intensely on a narrow task degrades its general reasoning and conversation abilities.',
            keyTakeaways: [
              'Start with Prompt Engineering, graduate to RAG for dynamic data, and fine-tune for domain specialization.',
              'Never use Fine-Tuning as a substitute for knowledge retrieval when data changes frequently.',
              'LoRA and QLoRA have democratized fine-tuning by allowing small teams to train adapters on single consumer GPUs.'
            ],
            applyIt: {
              prompt: 'A medical startup wants an AI to answer questions about rapidly updating clinical trial results. Which approach should they pick and why?',
              actionSteps: [
                'Analyze the requirement: Knowledge changes weekly.',
                'Reject fine-tuning (cannot retrain weights every week for new trials).',
                'Select RAG: Vector search over daily clinical trial publications with strict source citation.'
              ],
              reflectionQuestion: 'Why is fine-tuning poor at keeping up with frequently updated factual data?'
            },
            quiz: {
              id: 'quiz-finetune',
              lessonId: 'lesson-finetuning-vs-rag',
              title: 'Knowledge Check: Architecture Decisions',
              questions: [
                {
                  id: 'q1',
                  questionText: 'When is Fine-Tuning preferred over RAG?',
                  type: 'multiple_choice',
                  options: [
                    { id: 'opt1', text: 'When your company documentation changes every hour.' },
                    { id: 'opt2', text: 'When you need to teach a model a specialized formatting style, specific tone, or custom programming syntax across millions of low-latency calls.' },
                    { id: 'opt3', text: 'When you have zero budget and zero training data.' },
                    { id: 'opt4', text: 'When you want to avoid using GPUs.' }
                  ],
                  correctOptionId: 'opt2',
                  explanation: 'Fine-tuning excels at teaching behavioral style, syntax, and task-specific patterns rather than rapidly changing factual data.'
                }
              ]
            },
            nextLessonId: 'lesson-ai-evaluations'
          }
        ]
      }
    ]
  },
  {
    id: 'path-6',
    slug: 'ai-engineering-and-evals',
    title: 'AI Engineering & Evaluation',
    tagline: 'Systematic testing, benchmarking, LLM-as-a-Judge, and production monitoring.',
    description: 'Build rigorous evaluation suites, prevent regressions, measure latency, and optimize production foundation model pipelines.',
    difficulty: 'Advanced',
    category: 'AI Engineering',
    estimatedHours: 2.5,
    totalLessons: 1,
    icon: 'CheckCircle',
    orderIndex: 6,
    status: 'published',
    modules: [
      {
        id: 'mod-6-1',
        pathId: 'path-6',
        title: 'Production Evals',
        description: 'How to test non-deterministic software systematically.',
        orderIndex: 1,
        lessons: [
          {
            id: 'lesson-ai-evaluations',
            slug: 'ai-evaluation-and-benchmarking',
            moduleId: 'mod-6-1',
            pathId: 'path-6',
            title: 'AI Evaluation & Benchmarking (Evals)',
            tagline: 'How to reliably test non-deterministic software before shipping to production.',
            difficulty: 'Advanced',
            category: 'AI Engineering',
            estimatedMinutes: 9,
            orderIndex: 1,
            status: 'published',
            bigIdea: 'AI Evals are automated test suites and metric pipelines designed to measure factual accuracy, semantic similarity, and safety across non-deterministic generative models.',
            whyItMatters: 'When you tweak a prompt or switch models, you cannot manually read 500 test outputs. Without systematic Evals, fixing one edge case will quietly break five others.',
            simpleExplanation: 'In traditional software, `assert(add(2, 2) == 4)` is simple. In AI, asking "Summarize this article" could produce 1,000 different valid paragraphs. AI Evals use programmatic metrics (exact match, ROUGE, BERTScore) and LLM-as-a-Judge pipelines to score whether the response met core criteria consistently.',
            realWorldExample: {
              scenario: 'Updating the system prompt for an enterprise customer support bot.',
              impact: 'A CI/CD eval pipeline runs 500 historical customer conversations against the new prompt, verifying that resolution accuracy rose from 88% to 94% with zero safety regressions.',
            },
            keyIdeas: [
              { title: 'The Evals Pyramid', summary: '1. Unit/Deterministic checks -> 2. Model-based evaluation (LLM-as-a-Judge) -> 3. Human spot checks.' },
              { title: 'LLM-as-a-Judge', summary: 'Using an advanced reasoning model (like Gemini 3.1 Pro or GPT-4) with a detailed rubric to score candidate model responses from 1 to 5.' },
              { title: 'Golden Datasets', summary: 'Curated sets of 100–1,000 representative inputs with human-verified reference answers that represent core production edge cases.' }
            ],
            visualExplanation: {
              type: 'flow',
              title: 'Automated CI/CD Evaluation Pipeline',
              content: 'How modern AI teams test prompt and model changes continuously.',
              items: [
                { label: '1. PR Trigger', detail: 'Engineer modifies prompt or model version in GitHub PR' },
                { label: '2. Eval Execution', detail: 'Automated runner executes 250 golden test cases' },
                { label: '3. LLM-as-a-Judge', detail: 'Scores Helpfulness, Groundedness, and Tool Selection metrics' },
                { label: '4. Pass / Fail Gate', detail: 'PR blocked if accuracy drops > 1% or safety regressions occur' }
              ]
            },
            goDeeper: 'The RAG Triad framework specifically evaluates three orthogonal axes: Context Relevance (did retrieval find the right docs?), Groundedness (is the answer fully supported by context?), and Answer Relevance (does it actually answer the user query?).',
            keyTakeaways: [
              'You cannot improve what you do not measure systematically.',
              'LLM-as-a-Judge with rubric guidelines automates semantic quality scoring at scale.',
              'A curated golden evaluation dataset is the highest-leverage asset in enterprise AI development.'
            ],
            applyIt: {
              prompt: 'Design a 3-point rubric for an LLM-as-a-Judge to evaluate whether a customer support answer is helpful and polite.',
              actionSteps: [
                'Score 1: Irrelevant, rude, or fails to address core issue.',
                'Score 3: Accurate and polite, but verbose or missing next steps.',
                'Score 5: Clear, concise, perfectly empathetic, and provides exact solution with links.'
              ],
              reflectionQuestion: 'Why should the judge model be instructed to provide reasoning before outputting its numerical score?'
            },
            quiz: {
              id: 'quiz-evals',
              lessonId: 'lesson-ai-evaluations',
              title: 'Knowledge Check: AI Evals',
              questions: [
                {
                  id: 'q1',
                  questionText: 'What is the primary role of an "LLM-as-a-Judge" in modern AI evaluation pipelines?',
                  type: 'multiple_choice',
                  options: [
                    { id: 'opt1', text: 'To sentence cyber criminals in court.' },
                    { id: 'opt2', text: 'To evaluate candidate model responses against structured rubrics and reference criteria at automated scale.' },
                    { id: 'opt3', text: 'To write all source code without human supervision.' },
                    { id: 'opt4', text: 'To replace all human employees immediately.' }
                  ],
                  correctOptionId: 'opt2',
                  explanation: 'LLM-as-a-Judge uses foundation models with calibrated rubrics to score complex open-ended outputs at automated scale.'
                }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: 'path-7',
    slug: 'ai-at-work',
    title: 'AI at Work & Productivity',
    tagline: 'Practical frameworks for 10x professional productivity and business operations.',
    description: 'Transform everyday office workflows: research synthesis, writing, data analysis, and workflow automation.',
    difficulty: 'Beginner',
    category: 'AI at Work',
    estimatedHours: 2.0,
    totalLessons: 2,
    icon: 'Briefcase',
    orderIndex: 7,
    status: 'published',
    modules: [
      {
        id: 'mod-7-1',
        pathId: 'path-7',
        title: 'Workplace AI Mastery',
        description: 'Applied techniques for knowledge workers.',
        orderIndex: 1,
        lessons: [
          {
            id: 'lesson-ai-productivity-workflows',
            slug: 'ai-productivity-workflows',
            moduleId: 'mod-7-1',
            pathId: 'path-7',
            title: 'The AI-Powered Knowledge Worker',
            tagline: 'Moving from basic chat to integrated cognitive workflows.',
            difficulty: 'Beginner',
            category: 'AI at Work',
            estimatedMinutes: 7,
            orderIndex: 1,
            status: 'published',
            bigIdea: 'AI should not be treated as an infallible oracle; it is an indefatigable thought partner and drafting assistant for synthesis, critique, and transformation.',
            whyItMatters: 'Professionals who learn to co-create with AI produce higher quality strategic work in half the time, eliminating blank-page syndrome and repetitive administrative friction.',
            simpleExplanation: 'Think of AI as a hyper-competent executive intern. If you tell an intern "Write our marketing strategy," you will get generic fluff. But if you provide your customer interview transcripts and say "Extract the 5 recurring pain points and draft 3 value propositions," you get extraordinary leverage.',
            realWorldExample: {
              scenario: 'Analyzing 40 customer feedback survey responses in Excel.',
              impact: 'Instead of manually reading for 4 hours, feed the data to an LLM with instructions: "Tag each response with primary feature request, sentiment (1-5), and create a priority summary table."',
            },
            keyIdeas: [
              { title: 'The Co-Pilot Mindset', summary: 'Human sets vision, strategy, and quality verification; AI accelerates synthesis and variation generation.' },
              { title: 'Interactive Critique Loops', summary: 'Use the AI to red-team your own ideas: "Act as a skeptical CFO and point out the 3 biggest financial risks in this proposal."' },
              { title: 'Data Transformation', summary: 'Unmatched speed at converting messy unstructured notes into clean tables, schemas, and presentations.' }
            ],
            visualExplanation: {
              type: 'cards',
              title: 'High-ROI Workplace AI Applications',
              content: 'Core daily workflows optimized by generative models.',
              items: [
                { label: 'Executive Synthesis', detail: 'Summarizing 90-minute meeting transcripts into decisions & action items' },
                { label: 'Adversarial Review', detail: 'Finding blind spots in strategic plans before executive presentations' },
                { label: 'Draft Acceleration', detail: 'Generating 3 distinct stylistic variants of customer communications' }
              ]
            },
            goDeeper: 'Creating reusable personal prompt libraries with standard input/output placeholders allows teams to standardize high-frequency tasks across departments.',
            keyTakeaways: [
              'AI provides maximum leverage when given clear context and specific analytical framing.',
              'Use AI for rapid first drafts and adversarial critique, not unreviewed final sign-offs.',
              'Standardize prompts into team templates for recurring workflows.'
            ],
            applyIt: {
              prompt: 'Run an adversarial review prompt on your next project proposal.',
              actionSteps: [
                'Paste your 1-page proposal into the AI.',
                'Prompt: "You are an aggressive industry competitor. Identify the 3 weakest assumptions in this plan."',
                'Refine your proposal to address the critiques.'
              ],
              reflectionQuestion: 'How does using AI as an adversarial reviewer improve strategic resilience?'
            },
            quiz: {
              id: 'quiz-ai-work',
              lessonId: 'lesson-ai-productivity-workflows',
              title: 'Knowledge Check: AI at Work',
              questions: [
                {
                  id: 'q1',
                  questionText: 'What is the most effective way to utilize an LLM for strategic business analysis?',
                  type: 'multiple_choice',
                  options: [
                    { id: 'opt1', text: 'Letting the AI make final budget decisions with zero human review.' },
                    { id: 'opt2', text: 'Providing detailed context and using the AI as an analytical partner for synthesis, variation generation, and red-team critique.' },
                    { id: 'opt3', text: 'Asking one-sentence questions without any company context.' },
                    { id: 'opt4', text: 'Replacing all spreadsheet software.' }
                  ],
                  correctOptionId: 'opt2',
                  explanation: 'Providing deep context and leveraging the model for structured synthesis and adversarial critique yields the highest quality outcomes.'
                }
              ]
            },
            nextLessonId: 'lesson-ai-product-management'
          }
        ]
      }
    ]
  },
  {
    id: 'path-8',
    slug: 'ai-product-management',
    title: 'AI Product Management',
    tagline: 'Designing, scoping, and launching probabilistic AI-driven products.',
    description: 'Learn UX patterns for non-deterministic interfaces, fallback design, latency management, and AI unit economics.',
    difficulty: 'Intermediate',
    category: 'AI Product Management',
    estimatedHours: 2.5,
    totalLessons: 1,
    icon: 'Compass',
    orderIndex: 8,
    status: 'published',
    modules: [
      {
        id: 'mod-8-1',
        pathId: 'path-8',
        title: 'AI Product Strategy',
        description: 'The product discipline for probabilistic systems.',
        orderIndex: 1,
        lessons: [
          {
            id: 'lesson-ai-product-management',
            slug: 'product-management-for-ai',
            moduleId: 'mod-8-1',
            pathId: 'path-8',
            title: 'Designing Probabilistic Products',
            tagline: 'How managing AI products fundamentally differs from deterministic SaaS.',
            difficulty: 'Intermediate',
            category: 'AI Product Management',
            estimatedMinutes: 8,
            orderIndex: 1,
            status: 'published',
            bigIdea: 'Traditional software is deterministic (given input X, it always produces Y); AI software is probabilistic (it produces output with a confidence distribution), requiring new paradigms for UX, error tolerance, and safety.',
            whyItMatters: 'Product managers who treat AI like traditional software get caught off-guard by edge-case regressions, unpredictable API costs, latency variance, and user trust erosion.',
            simpleExplanation: 'In a traditional app, if a button breaks, it is a binary bug. In an AI app, the model might answer 95% of queries brilliantly, but occasionally give a weird response on query #96. An AI PM designs graceful fallback experiences, feedback loops (thumbs up/down), and guardrails so a model hiccup never leaves a user stranded.',
            realWorldExample: {
              scenario: 'Designing an AI auto-complete for customer support agents.',
              impact: 'Instead of automatically sending the AI reply to the customer, the PM designs an inline ghost-text UI where the human agent presses Tab to accept or edits freely, keeping humans accountable.',
            },
            keyIdeas: [
              { title: 'The Human-in-the-Loop Spectrum', summary: 'Autonomous (low risk) vs. Mixed Initiative (suggestions) vs. Human-confirmed (high risk).' },
              { title: 'Unit Economics & Token Budgets', summary: 'Modeling gross margins around token usage per active user per month.' },
              { title: 'Telemetry & Feedback Flywheels', summary: 'Instrumenting implicit user actions (accepts, edits, regenerations) to continuously improve product evals.' }
            ],
            visualExplanation: {
              type: 'cards',
              title: 'The AI UX Design Principles',
              content: 'Core interaction patterns for generative AI applications.',
              items: [
                { label: 'Set Realistic Expectations', detail: 'Never promise omniscience; frame as an assistant' },
                { label: 'Streaming UI', detail: 'Always stream tokens to reduce perceived latency to < 500ms' },
                { label: 'One-Click Editability', detail: 'Allow users to easily tweak or regenerate outputs without restarting' }
              ]
            },
            goDeeper: 'AI Unit Economics formula: `Gross Margin % = (Subscription Price - (Active Users × Avg Monthly Tokens × Cost Per Token)) / Subscription Price`. High token usage on complex reasoning models can quickly erode traditional 80%+ SaaS software margins.',
            keyTakeaways: [
              'AI products are probabilistic; design for graceful recovery and user steering.',
              'Streaming responses is essential to maintain snappy perceived latency.',
              'Track explicit and implicit user feedback to power continuous eval datasets.'
            ],
            applyIt: {
              prompt: 'Design the fallback and error UX for an AI document summarization feature.',
              actionSteps: [
                'Handle timeout: "Summarization taking longer than usual -> Offer background notification."',
                'Handle token overflow: Automatically chunk large PDFs into sections.',
                'Add explicit user correction controls and feedback buttons.'
              ],
              reflectionQuestion: 'Why is perceived latency often more critical than total completion time in AI UX?'
            },
            quiz: {
              id: 'quiz-ai-pm',
              lessonId: 'lesson-ai-product-management',
              title: 'Knowledge Check: AI Product Management',
              questions: [
                {
                  id: 'q1',
                  questionText: 'Why is streaming token output standard in modern AI user interfaces?',
                  type: 'multiple_choice',
                  options: [
                    { id: 'opt1', text: 'It saves server bandwidth.' },
                    { id: 'opt2', text: 'It delivers Time-to-First-Token (TTFT) in hundreds of milliseconds, dramatically improving perceived responsiveness compared to waiting seconds for full completion.' },
                    { id: 'opt3', text: 'It is required by law.' },
                    { id: 'opt4', text: 'It prevents computer memory leaks.' }
                  ],
                  correctOptionId: 'opt2',
                  explanation: 'Streaming provides immediate visual feedback to the user within hundreds of milliseconds rather than staring at a static loading spinner.'
                }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: 'path-9',
    slug: 'how-chatgpt-and-llms-work',
    title: 'How ChatGPT & LLMs Work',
    tagline: 'Demystifying the internal engineering of conversational language models.',
    description: 'Explore autoregressive decoding, sampling parameters (temperature, top-p), KV caching, and alignment.',
    difficulty: 'Intermediate',
    category: 'ChatGPT & LLMs',
    estimatedHours: 2.0,
    totalLessons: 1,
    icon: 'MessageSquare',
    orderIndex: 9,
    status: 'published',
    modules: [
      {
        id: 'mod-9-1',
        pathId: 'path-9',
        title: 'Decoding & Sampling',
        description: 'How tokens are sampled during generation.',
        orderIndex: 1,
        lessons: [
          {
            id: 'lesson-sampling-parameters',
            slug: 'temperature-top-p-sampling',
            moduleId: 'mod-9-1',
            pathId: 'path-9',
            title: 'Temperature, Top-P, and Sampling Parameters',
            tagline: 'Controlling the dial between deterministic precision and creative exploration.',
            difficulty: 'Intermediate',
            category: 'ChatGPT & LLMs',
            estimatedMinutes: 7,
            orderIndex: 1,
            status: 'published',
            bigIdea: 'LLMs generate probability distributions across thousands of candidate tokens; sampling hyperparameters (Temperature, Top-K, Top-P) control how the model selects the winning token from that distribution.',
            whyItMatters: 'Configuring Temperature and Top-P incorrectly causes coding models to hallucinate syntax errors (if set too high) or creative writing models to repeat the same robotic phrases (if set too low).',
            simpleExplanation: 'Imagine an AI choosing the next word is like spinning a roulette wheel where larger wedges represent more probable words. At Temperature 0, the wheel is locked: it ALWAYS picks the single biggest wedge (greedy decoding). As you raise temperature, the smaller wedges get larger, allowing creative, surprising words to be chosen.',
            realWorldExample: {
              scenario: 'Generating medical dosage calculations vs brainstorming sci-fi novel plots.',
              impact: 'Medical calculations require Temperature = 0.0 (strictly deterministic, zero creative risk). Sci-fi plot brainstorming benefits from Temperature = 0.8–1.0 (explorative, unexpected conceptual combinations).',
            },
            keyIdeas: [
              { title: 'Temperature', summary: 'Scales the logits before softmax. Low (0.0–0.2) = focused and repetitive; High (0.8–1.2) = diverse and creative.' },
              { title: 'Top-P (Nucleus Sampling)', summary: 'Considers only the smallest set of tokens whose cumulative probability exceeds P (e.g. 0.90), cutting off the low-probability long tail.' },
              { title: 'Top-K Sampling', summary: 'Limits selection strictly to the top K most probable tokens (e.g. Top 40 tokens).' }
            ],
            visualExplanation: {
              type: 'comparison',
              title: 'Sampling Behavior Across Temperatures',
              content: 'Visualizing token selection diversity at different temperature settings.',
              items: [
                { label: 'Temp = 0.0 (Greedy)', detail: 'Only selects token with highest probability. Fully reproducible.' },
                { label: 'Temp = 0.7 (Balanced)', detail: 'Balances coherent grammar with natural conversational variety.' },
                { label: 'Temp = 1.5+ (High Entropy)', detail: 'High randomness; risks grammatical breakdown and bizarre word choices.' }
              ]
            },
            goDeeper: 'KV (Key-Value) Caching saves the intermediate self-attention vectors for previously processed tokens in GPU memory, avoiding redundant computation during autoregressive generation and speeding up token generation significantly.',
            keyTakeaways: [
              'Use Temperature 0.0 for factual extraction, math, coding, and structured JSON generation.',
              'Use Temperature 0.7–1.0 for creative brainstorming, storytelling, and marketing copy.',
              'Top-P truncates the improbable long tail of tokens to prevent nonsensical hallucinations.'
            ],
            applyIt: {
              prompt: 'Configure the optimal hyperparameters for a JSON extraction endpoint.',
              actionSteps: [
                'Set `temperature: 0.0` for maximum schema adherence.',
                'Set `responseMimeType: "application/json"`.',
                'Verify zero variance across consecutive test runs.'
              ],
              reflectionQuestion: 'Why does setting temperature to 0.0 not 100% guarantee identical outputs if floating-point non-determinism exists across GPU clusters?'
            },
            quiz: {
              id: 'quiz-sampling',
              lessonId: 'lesson-sampling-parameters',
              title: 'Knowledge Check: Sampling Parameters',
              questions: [
                {
                  id: 'q1',
                  questionText: 'Which temperature setting is best suited for extracting structured data into a strict JSON schema?',
                  type: 'multiple_choice',
                  options: [
                    { id: 'opt1', text: 'Temperature = 1.9' },
                    { id: 'opt2', text: 'Temperature = 0.0' },
                    { id: 'opt3', text: 'Temperature = 0.85' },
                    { id: 'opt4', text: 'Temperature = -5.0' }
                  ],
                  correctOptionId: 'opt2',
                  explanation: 'Temperature 0.0 enforces greedy decoding, selecting the most probable tokens for maximum consistency and schema compliance.'
                }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: 'path-10',
    slug: 'ai-for-entrepreneurs',
    title: 'AI for Entrepreneurs & Startups',
    tagline: 'Finding durable moats, building AI MVPs, and navigating defensibility.',
    description: 'How to build defensible AI products beyond simple "wrapper" startups.',
    difficulty: 'Intermediate',
    category: 'AI at Work',
    estimatedHours: 2.0,
    totalLessons: 1,
    icon: 'TrendingUp',
    orderIndex: 10,
    status: 'published',
    modules: [
      {
        id: 'mod-10-1',
        pathId: 'path-10',
        title: 'Startup Defensibility',
        description: 'Building moats in the foundation model era.',
        orderIndex: 1,
        lessons: [
          {
            id: 'lesson-ai-startup-moats',
            slug: 'ai-startup-moats',
            moduleId: 'mod-10-1',
            pathId: 'path-10',
            title: 'Building Defensible AI Moats',
            tagline: 'Moving beyond "thin wrappers" to proprietary workflows and data flywheels.',
            difficulty: 'Intermediate',
            category: 'AI at Work',
            estimatedMinutes: 8,
            orderIndex: 1,
            status: 'published',
            bigIdea: 'Access to foundation models is a commodity; long-term defensibility comes from proprietary workflow integration, high switching costs, domain knowledge graphs, and proprietary data flywheels.',
            whyItMatters: 'Startups that merely put a basic UI on top of an API get wiped out whenever foundation models release their next minor update. Understanding true moats protects your investment and company trajectory.',
            simpleExplanation: 'If your app is just "Send PDF to GPT and show response," OpenAI will add that button natively next month. But if your software integrates deep into hospital EHR systems, verifies regulatory compliance, maps institutional knowledge, and coordinates physician sign-offs, your business is protected by workflow moats.',
            realWorldExample: {
              scenario: 'Harvey AI (legal AI platform) vs a generic ChatGPT wrapper.',
              impact: 'Harvey built proprietary integrations with law firm DMS systems, specialized legal citation databases, and enterprise security guarantees, securing major law firm contracts.',
            },
            keyIdeas: [
              { title: 'The Thin Wrapper Trap', summary: 'Features that can be cloned in an afternoon will inevitably be built natively into foundation model platforms.' },
              { title: 'Workflow & System of Record Moats', summary: 'Being the place where teams actually store, edit, approve, and collaborate on mission-critical work.' },
              { title: 'Proprietary Knowledge Graphs', summary: 'Structured domain relationships that cannot be scraped from the public web.' }
            ],
            visualExplanation: {
              type: 'cards',
              title: 'Sources of Sustainable AI Defensibility',
              content: 'What creates long-term enterprise value in the AI era.',
              items: [
                { label: 'Deep Workflow Integration', detail: 'High switching costs embedded in daily enterprise habits' },
                { label: 'Proprietary Data & Feedback', detail: 'Unique domain datasets and human feedback telemetry' },
                { label: 'Vertical Customization', detail: 'Deep compliance, security, and specialized tool integrations' }
              ]
            },
            goDeeper: 'The "Layer Cake" of modern AI value: 1. Silicon/Compute (NVIDIA) -> 2. Foundation Models (Google, OpenAI) -> 3. Infrastructure/Tooling -> 4. Vertical Applications (Where specific domain workflow moats live).',
            keyTakeaways: [
              'Model capability is a utility; workflow integration and domain context are the moat.',
              'Avoid building features that foundation model providers will release as native platform features.',
              'Own the customer relationship, the system of record, and the feedback flywheel.'
            ],
            applyIt: {
              prompt: 'Evaluate a startup idea using the "Thin Wrapper vs Defensible Moat" rubric.',
              actionSteps: [
                'Question 1: If GPT-5 becomes 2x smarter, does this startup get stronger or obsolete?',
                'Question 2: Does the product capture proprietary data with every customer interaction?',
                'Question 3: How difficult is it for a competitor to replicate the integrations?'
              ],
              reflectionQuestion: 'Why does an improved foundation model actually strengthen applications with deep workflow moats?'
            },
            quiz: {
              id: 'quiz-moats',
              lessonId: 'lesson-ai-startup-moats',
              title: 'Knowledge Check: Startup Moats',
              questions: [
                {
                  id: 'q1',
                  questionText: 'What provides the strongest long-term defensibility for an applied AI startup?',
                  type: 'multiple_choice',
                  options: [
                    { id: 'opt1', text: 'Keeping your prompt secret in the frontend.' },
                    { id: 'opt2', text: 'Deep enterprise workflow integrations, proprietary data flywheels, and becoming the system of record.' },
                    { id: 'opt3', text: 'Relying exclusively on the newest public API.' },
                    { id: 'opt4', text: 'Having a catchy domain name.' }
                  ],
                  correctOptionId: 'opt2',
                  explanation: 'Workflow embedding and proprietary data integration create durable enterprise switching costs and defensibility.'
                }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: 'path-11',
    slug: 'ai-engineering',
    title: 'AI Engineering & Systems',
    tagline: 'Full-stack architectures, latency optimization, and infrastructure.',
    description: 'Master server-side architectures, streaming protocols, token caching, and model routing.',
    difficulty: 'Advanced',
    category: 'AI Engineering',
    estimatedHours: 3.0,
    totalLessons: 1,
    icon: 'Server',
    orderIndex: 11,
    status: 'published',
    modules: [
      {
        id: 'mod-11-1',
        pathId: 'path-11',
        title: 'System Architecture',
        description: 'Production infrastructure for high-throughput AI.',
        orderIndex: 1,
        lessons: [
          {
            id: 'lesson-production-ai-architecture',
            slug: 'production-ai-architecture',
            moduleId: 'mod-11-1',
            pathId: 'path-11',
            title: 'Production Full-Stack AI Architecture',
            tagline: 'Building secure, scalable, and resilient AI backends.',
            difficulty: 'Advanced',
            category: 'AI Engineering',
            estimatedMinutes: 9,
            orderIndex: 1,
            status: 'published',
            bigIdea: 'Production AI engineering requires decoupling client interactions through secure server-side proxies, implementing prompt shielding, rate limiting, and resilient model fallback tiers.',
            whyItMatters: 'Direct client-side API calls expose secret credentials to browser DevTools, open systems to prompt injection attacks, and leave apps vulnerable to third-party outages.',
            simpleExplanation: 'Your frontend should never talk directly to AI providers. Your server sits in the middle like a security checkpoint: it authenticates users, injects secret keys, sanitizes inputs to prevent jailbreaks, caches frequent queries to save money, and streams responses back cleanly via Server-Sent Events (SSE).',
            realWorldExample: {
              scenario: 'High-throughput enterprise AI search gateway.',
              impact: 'Semantic prompt caching serves 35% of common employee questions instantly from Redis memory without calling LLM APIs, reducing cloud spend by $40,000/month.',
            },
            keyIdeas: [
              { title: 'Server-Side API Proxying', summary: 'API keys must NEVER touch the client browser bundle. All requests route through protected `/api/*` endpoints.' },
              { title: 'Streaming Protocols (SSE / WebSockets)', summary: 'Chunked transfer encoding for low-latency real-time response rendering.' },
              { title: 'Semantic Caching & Tiered Fallbacks', summary: 'Caching repeated prompt embeddings and falling back to secondary providers if the primary provider throttles.' }
            ],
            visualExplanation: {
              type: 'architecture',
              title: 'Secure Full-Stack AI System Architecture',
              content: 'The production separation of concerns between client and server layers.',
              items: [
                { label: 'Client (Web / Mobile)', detail: 'Renders UI, streams SSE chunks, holds zero secret API keys' },
                { label: 'Express / Next.js Server', detail: 'Auth, Rate Limiting, Prompt Guardrails, Context Injection' },
                { label: 'AI Provider Layer', detail: '@google/genai SDK (gemini-3.7-flash) with structured schemas' }
              ]
            },
            goDeeper: 'Prompt Injection Defense: Always delimit user inputs using XML tags (e.g. `<user_input>{input}</user_input>`) and instruct the system prompt to ignore instructions attempting to override system directives inside those tags.',
            keyTakeaways: [
              'Keep all AI provider keys strictly on the server.',
              'Use Server-Sent Events (SSE) for responsive streaming interfaces.',
              'Implement semantic caching to reduce cost and latency for frequent queries.'
            ],
            applyIt: {
              prompt: 'Audit an API endpoint for prompt injection vulnerabilities and security risks.',
              actionSteps: [
                'Verify API key is read from `process.env` on server only.',
                'Wrap user content in explicit XML bounding tags.',
                'Implement per-user rate limiting (e.g. 20 requests/minute).'
              ],
              reflectionQuestion: 'Why does direct browser SDK usage represent a critical security vulnerability in web applications?'
            },
            quiz: {
              id: 'quiz-arch',
              lessonId: 'lesson-production-ai-architecture',
              title: 'Knowledge Check: Production Architecture',
              questions: [
                {
                  id: 'q1',
                  questionText: 'Where should AI provider SDKs and API keys always be initialized in a production web application?',
                  type: 'multiple_choice',
                  options: [
                    { id: 'opt1', text: 'In the client-side browser JavaScript bundle.' },
                    { id: 'opt2', text: 'Exclusively on the server-side backend behind secure API endpoints.' },
                    { id: 'opt3', text: 'In public URL query parameters.' },
                    { id: 'opt4', text: 'In CSS stylesheets.' }
                  ],
                  correctOptionId: 'opt2',
                  explanation: 'API keys must remain server-side to prevent exposure, unauthorized billing abuse, and prompt tampering.'
                }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: 'path-12',
    slug: 'advanced-ai-concepts',
    title: 'Advanced AI Concepts & Frontiers',
    tagline: 'Reasoning models, multimodal fusion, test-time compute, and safety alignment.',
    description: 'Explore frontier research: Test-Time Compute, Chain-of-Thought reasoning architectures, and mechanistic interpretability.',
    difficulty: 'Advanced',
    category: 'AI Research',
    estimatedHours: 2.5,
    totalLessons: 1,
    icon: 'Brain',
    orderIndex: 12,
    status: 'published',
    modules: [
      {
        id: 'mod-12-1',
        pathId: 'path-12',
        title: 'Frontier AI Research',
        description: 'The cutting edge of artificial intelligence.',
        orderIndex: 1,
        lessons: [
          {
            id: 'lesson-test-time-compute',
            slug: 'test-time-compute-and-reasoning',
            moduleId: 'mod-12-1',
            pathId: 'path-12',
            title: 'Test-Time Compute & Reasoning Models',
            tagline: 'How thinking tokens and search during inference unlock PhD-level problem solving.',
            difficulty: 'Advanced',
            category: 'AI Research',
            estimatedMinutes: 9,
            orderIndex: 1,
            status: 'published',
            bigIdea: 'Instead of spending all compute during pre-training, reasoning models allocate extra compute at inference time ("Test-Time Compute") to generate hidden thoughts, backtrack, and verify logic before answering.',
            whyItMatters: 'Test-Time Compute represents the new scaling frontier, enabling models to solve Olympiad-level mathematics, complex competitive programming, and deep scientific proofs.',
            simpleExplanation: 'A standard LLM answers instantly like a person speaking on live television without pausing. A reasoning model pauses, writes out scratch notes, tests hypotheses, realizes an error in step 3, corrects its course, and only then delivers the final polished answer.',
            realWorldExample: {
              scenario: 'Finding subtle race conditions in complex distributed systems code.',
              impact: 'The model spends 45 seconds exploring execution traces in its hidden thought chain before pinpointing the exact thread deadlocking scenario.',
            },
            keyIdeas: [
              { title: 'The New Scaling Law', summary: 'Performance scales not just with training compute, but with the amount of thinking time allocated at inference.' },
              { title: 'Self-Correction & Backtracking', summary: 'The model uses internal search to evaluate candidate reasoning paths and discard dead ends.' },
              { title: 'Reinforcement Learning on Thought Chains', summary: 'Trained using RL to discover effective reasoning heuristics without human prompt intervention.' }
            ],
            visualExplanation: {
              type: 'flow',
              title: 'Standard Generation vs Test-Time Reasoning',
              content: 'Comparison of direct token generation vs exploratory thought chains.',
              items: [
                { label: 'Standard Model', detail: 'Prompt -> Immediate Token Stream (Single-pass greedy prediction)' },
                { label: 'Reasoning Model', detail: 'Prompt -> [Hidden Thought Chain: Plan -> Search -> Verify -> Backtrack] -> Verified Output' }
              ]
            },
            goDeeper: 'Mechanistic Interpretability research explores the internal circuits of neural networks to understand how concepts (like honesty, deception, or syntax) are physically represented across attention heads and MLP layers.',
            keyTakeaways: [
              'Test-Time Compute allows models to trade inference latency for complex reasoning depth.',
              'Thought chains enable self-correction and multi-step verification.',
              'Inference scaling complements pre-training scaling to push the frontier of intelligence.'
            ],
            applyIt: {
              prompt: 'Identify when to deploy a fast conversational model vs a deep reasoning model in an enterprise stack.',
              actionSteps: [
                'Fast Model (e.g. Gemini Flash): Customer chats, summarization, basic extraction (< 1 sec latency).',
                'Reasoning Model (e.g. Gemini 3.1 Pro / Thinking): Multi-file code generation, legal contract auditing, complex math.'
              ],
              reflectionQuestion: 'Why does test-time compute solve problems that cannot be solved by simply adding more pre-training data?'
            },
            quiz: {
              id: 'quiz-reasoning',
              lessonId: 'lesson-test-time-compute',
              title: 'Knowledge Check: Reasoning Models',
              questions: [
                {
                  id: 'q1',
                  questionText: 'What is the core mechanism behind Test-Time Compute in modern reasoning models?',
                  type: 'multiple_choice',
                  options: [
                    { id: 'opt1', text: 'Running the GPU fans at higher speed.' },
                    { id: 'opt2', text: 'Allocating additional computational tokens and search during inference to explore reasoning paths, verify steps, and self-correct before outputting the answer.' },
                    { id: 'opt3', text: 'Downloading more training data during the chat.' },
                    { id: 'opt4', text: 'Asking the user to solve the problem for them.' }
                  ],
                  correctOptionId: 'opt2',
                  explanation: 'Test-time compute generates internal reasoning and verification tokens during inference, allowing the model to explore and self-correct.'
                }
              ]
            }
          }
        ]
      }
    ]
  }
];

export const SEED_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Welcome to AI Atlas!',
    message: 'Your personalized AI learning path has been generated based on your goals.',
    type: 'achievement',
    timestamp: 'Just now',
    read: false,
    actionUrl: '/home',
  },
  {
    id: 'notif-2',
    title: 'Recommended for You',
    message: 'Start today\'s 8-minute lesson: "What Is a Large Language Model (LLM)?"',
    type: 'lesson',
    timestamp: '2 hours ago',
    read: false,
    actionUrl: '/learn/ai-foundations/what-is-an-llm',
  },
  {
    id: 'notif-3',
    title: 'Streak Active!',
    message: 'You have started your 3-day AI learning streak. Complete today\'s quiz to keep it going!',
    type: 'streak',
    timestamp: '1 day ago',
    read: true,
    actionUrl: '/progress',
  }
];
