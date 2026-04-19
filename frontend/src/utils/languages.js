export const LANGUAGES = [
  { id: 'python', label: 'Python', monaco: 'python', icon: '🐍', versionIndex: '4' },
  { id: 'javascript', label: 'JavaScript', monaco: 'javascript', icon: '🟡', versionIndex: '4' },
  { id: 'java', label: 'Java', monaco: 'java', icon: '☕', versionIndex: '4' },
  { id: 'c', label: 'C', monaco: 'c', icon: '⚙️', versionIndex: '5' },
  { id: 'cpp', label: 'C++', monaco: 'cpp', icon: '🔧', versionIndex: '1' },
]

export const LANGUAGE_MAP = Object.fromEntries(LANGUAGES.map(l => [l.id, l]))

export const DEFAULT_CODE = {
  python: '# Python\nprint("Hello, World!")\n',
  javascript: '// JavaScript\nconsole.log("Hello, World!");\n',
  typescript: '// TypeScript\nconst msg: string = "Hello, World!";\nconsole.log(msg);\n',
  java: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}\n',
  c: '#include <stdio.h>\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}\n',
  cpp: '#include <iostream>\nusing namespace std;\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}\n',
  csharp: 'using System;\nclass Program {\n    static void Main() {\n        Console.WriteLine("Hello, World!");\n    }\n}\n',
  go: 'package main\nimport "fmt"\nfunc main() {\n    fmt.Println("Hello, World!")\n}\n',
  rust: 'fn main() {\n    println!("Hello, World!");\n}\n',
  ruby: 'puts "Hello, World!"\n',
  php: '<?php\necho "Hello, World!\\n";\n',
  swift: 'print("Hello, World!")\n',
  kotlin: 'fun main() {\n    println("Hello, World!")\n}\n',
  scala: 'object Main extends App {\n  println("Hello, World!")\n}\n',
  bash: '#!/bin/bash\necho "Hello, World!"\n',
}
