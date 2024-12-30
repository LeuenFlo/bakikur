import subprocess
import sys

def run_command(command):
    try:
        process = subprocess.run(command, shell=True, check=True, text=True, capture_output=True)
        print(process.stdout)
        return True
    except subprocess.CalledProcessError as e:
        print(f"Error: {e}")
        print(e.stdout)
        print(e.stderr)
        return False

def main():
    print("🏗️  Building the application...")
    build_command = 'ng build --base-href="https://leuenflo.github.io/bakikur/" --output-path=dist/browser'
    
    if run_command(build_command):
        print("✅ Build successful!")
        print("🚀 Deploying to GitHub Pages...")
        
        deploy_command = "npx angular-cli-ghpages --dir=dist/bakikur-web/browser"
        if run_command(deploy_command):
            print("✨ Deployment successful!")
            print("🌐 Your app should be available at: https://leuenflo.github.io/bakikur/")
            return 0
        else:
            print("❌ Deployment failed!")
            return 1
    else:
        print("❌ Build failed!")
        return 1

if __name__ == "__main__":
    sys.exit(main()) 